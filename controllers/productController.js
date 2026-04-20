// ============================================
// controllers/productController.js - Controller Produk
// ============================================
// Controller bertugas menerima request dari route,
// memanggil model, lalu mengirim response ke view.

const ProductModel = require('../models/productModel');

const productController = {

  // GET /products - Tampilkan semua produk
  getAllProducts: async (req, res) => {
    try {
      const { category, results } = req.query;
      const products = await ProductModel.getAllProducts(category, results || 20);
      res.render('pages/products/index', {
        title: 'Semua Produk',
        products,
        selectedCategory: category || '',
        results: results || 20
      });
    } catch (err) {
      req.flash('error', `Gagal mengambil produk: ${err.message}`);
      res.redirect('/');
    }
  },

  // GET /products/:id - Tampilkan detail satu produk
  getProductById: async (req, res) => {
    try {
      const product = await ProductModel.getProductById(req.params.id);
      res.render('pages/products/detail', {
        title: product.name,
        product
      });
    } catch (err) {
      req.flash('error', `Produk tidak ditemukan: ${err.message}`);
      res.redirect('/products');
    }
  }

};

module.exports = productController;
