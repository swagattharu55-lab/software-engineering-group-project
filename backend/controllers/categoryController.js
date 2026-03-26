const Category = require('../models/categoryModel');
const Listing = require('../models/listingModel');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.render('categories', { title: 'Food Categories', categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getListingsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.getById(categoryId);
    
    if (!category) {
      return res.status(404).render('404', { message: 'Category not found' });
    }

    const listings = await Listing.getByCategoryId(categoryId);
    res.render('listings', { 
      title: `${category.name} Listings`, 
      listings,
      categoryName: category.name 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
