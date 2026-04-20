// routes/orderRoutes.js
// ============================================
// Mendefinisikan semua URL yang berhubungan dengan Order
// Semua route di sini memerlukan Access Token!
// ============================================
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET    /orders           → Semua pesanan
// GET    /orders/new       → Form buat pesanan
// POST   /orders           → Simpan pesanan baru
// GET    /orders/:id       → Detail pesanan
// GET    /orders/:id/edit  → Form edit pesanan
// PATCH  /orders/:id       → Update pesanan
// DELETE /orders/:id       → Hapus pesanan

router.get('/', orderController.getAllOrders);
router.get('/new', orderController.getCreateOrderForm);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/:id/edit', orderController.getEditOrderForm);
router.patch('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
