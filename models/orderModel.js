// ============================================
// models/orderModel.js - Model Pesanan
// ============================================
// Model ini menangani semua operasi yang berhubungan dengan Order (Pesanan).
// Catatan: Endpoint order memerlukan Authorization Bearer Token!

const { api } = require('./apiConfig');

const OrderModel = {

  // Buat pesanan baru (butuh token)
  createOrder: async (token, cartId, customerName) => {
    const response = await api.post('/orders',
      { cartId, customerName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Ambil semua pesanan (butuh token)
  getAllOrders: async (token) => {
    const response = await api.get('/orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Ambil detail satu pesanan (butuh token)
  getOrderById: async (token, orderId) => {
    const response = await api.get(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // Update komentar pesanan (butuh token)
  updateOrder: async (token, orderId, comment) => {
    const response = await api.patch(`/orders/${orderId}`,
      { comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Hapus pesanan (butuh token)
  deleteOrder: async (token, orderId) => {
    const response = await api.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

};

module.exports = OrderModel;
