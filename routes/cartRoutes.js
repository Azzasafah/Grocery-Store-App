// routes/cartRoutes.js
// ============================================
// Mendefinisikan semua URL yang berhubungan dengan Cart
// ============================================
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST /cart/create          → Buat keranjang baru
// GET  /cart                 → Lihat isi keranjang
// POST /cart/items           → Tambah item ke keranjang
// PATCH /cart/items/:itemId  → Update quantity item
// PUT  /cart/items/:itemId   → Ganti produk
// DELETE /cart/items/:itemId → Hapus item
// POST /cart/clear           → Reset keranjang

router.post('/create', cartController.createCart);
router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.patch('/items/:itemId', cartController.updateItem);
router.put('/items/:itemId', cartController.replaceItem);
router.delete('/items/:itemId', cartController.deleteItem);
router.post('/clear', cartController.clearCart);

module.exports = router;
