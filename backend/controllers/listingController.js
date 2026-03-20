const { Listing } = require('../models/listing');
const { Category } = require('../models/category');

exports.getAllListings = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const listings = await Listing.getAllListings(categoryId);
    const categories = await Category.getAllCategories();
    res.render('pages/listings', { listings, categories, selectedCategory: categoryId });
  } catch (err) {
    console.error(err);
    res.send('Error loading listings');
  }
};

exports.getListingDetail = async (req, res) => {
  try {
    const listing = new Listing(req.params.id);
    await listing.getListingDetails();
    const categories = await Category.getAllCategories();
    res.render('pages/detail', { listing, categories });
  } catch (err) {
    console.error(err);
    res.send('Error loading listing');
  }
};

exports.getNewListing = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.render('pages/new-listing', { categories });
  } catch (err) {
    console.error(err);
    res.send('Error loading form');
  }
};

exports.createListing = async (req, res) => {
  try {
    const { title, description, quantity, expiry_date, category_id } = req.body;
    await Listing.createListing(1, title, description, quantity, expiry_date, category_id);
    res.redirect('/listings');
  } catch (err) {
    console.error(err);
    res.send('Error creating listing');
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id, category_id } = req.body;
    const listing = new Listing(id);
    await listing.updateCategory(category_id);
    res.redirect('/listings/' + id);
  } catch (err) {
    console.error(err);
    res.send('Error updating category');
  }
};