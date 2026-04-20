// ============================================
// controllers/orderController.js - Controller Pesanan
// ============================================

const OrderModel = require('../models/orderModel');

const orderController = {

  // GET /orders - Tampilkan semua pesanan
  getAllOrders: async (req, res) => {
    const token = req.session.accessToken;
    if (!token) {
      req.flash('error', '⚠️ Kamu harus punya Access Token dulu! Daftar di halaman Auth.');
      return res.redirect('/auth');
    }
    try {
      const orders = await OrderModel.getAllOrders(token);
      res.render('pages/orders/index', {
        title: 'Semua Pesanan',
        orders
      });
    } catch (err) {
      req.flash('error', `Gagal mengambil pesanan: ${err.message}`);
      res.render('pages/orders/index', { title: 'Semua Pesanan', orders: [] });
    }
  },

  // GET /orders/new - Form buat pesanan
  getCreateOrderForm: (req, res) => {
    const token = req.session.accessToken;
    if (!token) {
      req.flash('error', '⚠️ Kamu harus punya Access Token dulu!');
      return res.redirect('/auth');
    }
    res.render('pages/orders/create', {
      title: 'Buat Pesanan Baru',
      cartId: req.session.cartId
    });
  },

  // POST /orders - Buat pesanan baru
  createOrder: async (req, res) => {
    try {
      const token = req.session.accessToken;
      if (!token) {
        req.flash('error', '⚠️ Access Token diperlukan!');
        return res.redirect('/auth');
      }
      const { cartId, customerName } = req.body;
      const data = await OrderModel.createOrder(token, cartId, customerName);
      req.flash('success', `✅ Pesanan berhasil dibuat! Order ID: ${data.orderId}`);
      res.redirect('/orders');
    } catch (err) {
      req.flash('error', `Gagal membuat pesanan: ${err.message}`);
      res.redirect('/orders/new');
    }
  },

  // GET /orders/:id - Detail pesanan
  getOrderById: async (req, res) => {
    try {
      const token = req.session.accessToken;
      if (!token) {
        req.flash('error', '⚠️ Access Token diperlukan!');
        return res.redirect('/auth');
      }
      const order = await OrderModel.getOrderById(token, req.params.id);
      res.render('pages/orders/detail', {
        title: `Pesanan #${req.params.id}`,
        order
      });
    } catch (err) {
      req.flash('error', `Pesanan tidak ditemukan: ${err.message}`);
      res.redirect('/orders');
    }
  },

  // GET /orders/:id/edit - Form edit pesanan
  getEditOrderForm: async (req, res) => {
    try {
      const token = req.session.accessToken;
      if (!token) {
        req.flash('error', '⚠️ Access Token diperlukan!');
        return res.redirect('/auth');
      }
      const order = await OrderModel.getOrderById(token, req.params.id);
      res.render('pages/orders/edit', {
        title: `Edit Pesanan #${req.params.id}`,
        order
      });
    } catch (err) {
      req.flash('error', `Gagal mengambil pesanan: ${err.message}`);
      res.redirect('/orders');
    }
  },

  // PATCH /orders/:id - Update komentar pesanan
  updateOrder: async (req, res) => {
    try {
      const token = req.session.accessToken;
      const { comment } = req.body;
      await OrderModel.updateOrder(token, req.params.id, comment);
      req.flash('success', '✅ Pesanan berhasil diperbarui!');
      res.redirect('/orders');
    } catch (err) {
      req.flash('error', `Gagal update pesanan: ${err.message}`);
      res.redirect('/orders');
    }
  },

  // DELETE /orders/:id - Hapus pesanan
  deleteOrder: async (req, res) => {
    try {
      const token = req.session.accessToken;
      await OrderModel.deleteOrder(token, req.params.id);
      req.flash('success', '🗑️ Pesanan berhasil dihapus!');
      res.redirect('/orders');
    } catch (err) {
      req.flash('error', `Gagal menghapus pesanan: ${err.message}`);
      res.redirect('/orders');
    }
  }

};

module.exports = orderController;
