const Rating = require('../models/ratingModel');
const Request = require('../models/requestModel');

exports.getRatingForm = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const request = await Request.getById(req.params.requestId);
    if (!request || request.status !== 'completed') return res.redirect('/dashboard');
    
    const db = require('../db');
    const [rows] = await db.query('SELECT l.user_id as owner_id, l.title FROM requests r JOIN listings l ON r.listing_id = l.id WHERE r.id = ?', [request.id]);
    const ownerId = rows[0].owner_id;
    const title = rows[0].title;
    
    // If you are the owner, you rate the requester. If you are the requester, you rate the owner.
    const ratedId = (req.session.user.id === ownerId) ? request.requester_id : ownerId;
    
    res.render('rate', { title: 'Leave a Rating', request, ratedId, foodTitle: title });
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.submitRating = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const { rated_id, request_id, score, review } = req.body;
    await Rating.create(req.session.user.id, rated_id, request_id, score, review);
    res.redirect(`/users/${rated_id}`);
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
