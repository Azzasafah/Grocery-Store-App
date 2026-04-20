// ============================================
// models/productModel.js - Model Produk
// ============================================
// Model ini menangani semua operasi data yang berhubungan dengan Produk.
// Fungsi-fungsi di sini memanggil API dan mengembalikan datanya.

const { api } = require('./apiConfig');

const ProductModel = {

  // Ambil semua produk (bisa difilter dan dibatasi jumlahnya)
  getAllProducts: async (category = null, results = 20) => {
    const params = { results };
    if (category) params.category = category;
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Ambil detail satu produk berdasarkan ID
  getProductById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  }

};

module.exports = ProductModel;
