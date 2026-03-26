const Message = require('../models/messageModel');
const Listing = require('../models/listingModel');

exports.sendMessage = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  
  try {
    const { listing_id, content } = req.body;
    const listing = await Listing.getById(listing_id);
    if (!listing) return res.status(404).send('Listing not found');
    
    // Prevent messaging yourself
    if (listing.user_id !== req.session.user.id) {
       await Message.create(req.session.user.id, listing.user_id, listing_id, content);
    }
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
