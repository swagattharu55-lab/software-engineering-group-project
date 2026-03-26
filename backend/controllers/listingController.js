const Listing = require('../models/listingModel');
const Category = require('../models/categoryModel');
const Message = require('../models/messageModel');
const Request = require('../models/requestModel');

exports.getAllListings = async (req, res) => {
  try {
    const { search, location } = req.query;
    const listings = await Listing.getAllActive(search, location);
    res.render('listings', { title: 'Available Food', listings, search, location });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.getById(req.params.id);
    if (!listing) {
      return res.status(404).render('404', { message: 'Listing not found' });
    }
    res.render('detail', { title: listing.title, listing });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getUserDashboard = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  
  try {
    const userId = req.session.user.id;
    const listings = await Listing.getByUserId(userId);
    const categories = await Category.getAll();
    const incomingRequests = await Request.getByOwnerId(userId);
    const outgoingRequests = await Request.getByRequesterId(userId);
    
    res.render('dashboard', { title: 'Dashboard', listings, categories, incomingRequests, outgoingRequests });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.createListing = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const { title, description, category_id, quantity, location, expiry_date } = req.body;
    let image_url = '/images/placeholder.jpg';
    if (req.file) {
      image_url = '/uploads/' + req.file.filename;
    }
    
    await Listing.create({ 
      user_id: req.session.user.id, 
      title, description, category_id, quantity, location, image_url, expiry_date 
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteListing = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    await Listing.delete(req.params.id, req.session.user.id);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
