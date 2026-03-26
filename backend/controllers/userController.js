const User = require('../models/userModel');
const Listing = require('../models/listingModel');
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.render('users', { title: 'Community Users', users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).render('404', { message: 'User not found' });
    }
    res.render('profile', { title: `${user.name}'s Profile`, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await User.getById(req.params.id);
    if (!userProfile) return res.status(404).send('User not found');
    
    // Get their active listings
    const userListings = await Listing.getByUserId(req.params.id);
    
    // Fetch statistics
    const db = require('../db');
    const [completedRows] = await db.query(
      `SELECT COUNT(*) as count FROM requests r JOIN listings l ON r.listing_id = l.id WHERE l.user_id = ? AND r.status = 'completed'`, 
      [userProfile.id]
    );
    const completedPickups = completedRows[0].count;

    const [requestedRows] = await db.query(
      `SELECT COUNT(*) as count FROM requests WHERE requester_id = ?`, 
      [userProfile.id]
    );
    const totalRequested = requestedRows[0].count;
    
    const Rating = require('../models/ratingModel');
    const ratingData = await Rating.getAverageForUser(userProfile.id);
    const avgRating = ratingData.avgScore ? parseFloat(ratingData.avgScore).toFixed(1) : 'No Ratings';
    const reviewCount = ratingData.reviewCount || 0;
    
    // Fetch ledger
    const [completedReqs] = await db.query(
      `SELECT r.created_at, r.blockchain_hash FROM requests r JOIN listings l ON r.listing_id = l.id WHERE l.user_id = ? AND r.status = 'completed'`,
      [userProfile.id]
    );

    // Fetch reviews
    const [reviewsRows] = await db.query(
      `SELECT r.score, r.review, r.created_at, u.name as rater_name FROM ratings r JOIN users u ON r.rater_id = u.id WHERE r.rated_id = ? ORDER BY r.created_at DESC`,
      [userProfile.id]
    );
    
    res.render('profile', { 
      title: `${userProfile.name}'s Profile`, 
      userProfile, 
      userListings, 
      completedPickups, 
      totalRequested,
      avgRating,
      reviewCount,
      completedRequests: completedReqs,
      reviews: reviewsRows
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
