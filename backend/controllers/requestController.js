const Request = require('../models/requestModel');
const Listing = require('../models/listingModel');
const Message = require('../models/messageModel');

exports.createRequest = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const { listing_id, content } = req.body;
    const listing = await Listing.getById(listing_id);
    
    if (!listing || listing.user_id === req.session.user.id) {
      return res.redirect('/listings');
    }
    
    // Create the request
    const requestId = await Request.create(listing_id, req.session.user.id);
    
    // Create initial message tied to this request
    if (content) {
      await Message.create(req.session.user.id, listing.user_id, requestId, content); // Wait, message schema took request_id not listing_id in new init.sql
    }
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateRequestStatus = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const { id, action } = req.params; // action = accept, reject, complete
    const request = await Request.getById(id);
    if (!request) return res.status(404).send('Request not found');

    if (action === 'accept') {
      await Request.updateStatus(id, 'accepted');
      // Update listing status
      const db = require('../db');
      await db.query('UPDATE listings SET status = ? WHERE id = ?', ['pending', request.listing_id]);
    } else if (action === 'reject') {
      await Request.updateStatus(id, 'rejected');
    } else if (action === 'complete') {
      const db = require('../db');
      const hash = require('crypto').createHash('sha256').update(Date.now().toString() + id).digest('hex');
      
      await db.query('UPDATE requests SET status = ?, blockchain_hash = ? WHERE id = ?', ['completed', hash, id]);
      await db.query('UPDATE listings SET status = ? WHERE id = ?', ['collected', request.listing_id]);

      // Gamification Points award
      const [listingRows] = await db.query('SELECT user_id FROM listings WHERE id = ?', [request.listing_id]);
      const ownerId = listingRows[0].user_id;

      await db.query('UPDATE users SET points = points + 50 WHERE id = ?', [ownerId]);
      
      // Upgrade Badge logic
      const [userRows] = await db.query('SELECT points FROM users WHERE id = ?', [ownerId]);
      const pts = userRows[0].points;
      if (pts >= 100) {
        await db.query('UPDATE users SET badges = ? WHERE id = ?', ['✨ Food Saver', ownerId]);
      }
    }
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
