// routes/productRoutes.js
// ============================================
// Mendefinisikan semua URL yang berhubungan dengan Produk
// ============================================
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products          → Tampilkan semua produk
// GET /products/:id      → Tampilkan detail produk

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
