const Listing = require('../models/listingModel');

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.getAllActive();
    res.render('listings', { title: 'Available Food', listings });
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
