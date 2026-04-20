// ============================================
// models/cartModel.js - Model Keranjang Belanja
// ============================================
// Model ini menangani semua operasi yang berhubungan dengan Cart (Keranjang).

const { api } = require('./apiConfig');

const CartModel = {

  // Buat keranjang baru
  createCart: async () => {
    const response = await api.post('/carts');
    return response.data;
  },

  // Ambil detail keranjang
  getCart: async (cartId) => {
    const response = await api.get(`/carts/${cartId}`);
    return response.data;
  },

  // Ambil semua item dalam keranjang
  getCartItems: async (cartId) => {
    const response = await api.get(`/carts/${cartId}/items`);
    return response.data;
  },

  // Tambah produk ke keranjang
  addItemToCart: async (cartId, productId, quantity = 1) => {
    const response = await api.post(`/carts/${cartId}/items`, {
      productId: parseInt(productId),
      quantity: parseInt(quantity)
    });
    return response.data;
  },

  // Update jumlah item (PATCH - hanya ubah quantity)
  updateItemQuantity: async (cartId, itemId, quantity) => {
    const response = await api.patch(`/carts/${cartId}/items/${itemId}`, {
      quantity: parseInt(quantity)
    });
    return response.data;
  },

  // Ganti produk di keranjang (PUT - ganti seluruh item)
  replaceItemInCart: async (cartId, itemId, productId, quantity) => {
    const response = await api.put(`/carts/${cartId}/items/${itemId}`, {
      productId: parseInt(productId),
      quantity: parseInt(quantity)
    });
    return response.data;
  },

  // Hapus item dari keranjang
  deleteItem: async (cartId, itemId) => {
    const response = await api.delete(`/carts/${cartId}/items/${itemId}`);
    return response.data;
  }

};

module.exports = CartModel;
