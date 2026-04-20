// ============================================
// models/authModel.js - Model Autentikasi
// ============================================
// Model ini menangani registrasi API client untuk mendapatkan Access Token.

const { api } = require('./apiConfig');

const AuthModel = {

  // Daftar sebagai API client untuk mendapatkan token
  registerClient: async (clientName, clientEmail) => {
    const response = await api.post('/api-clients', {
      clientName,
      clientEmail
    });
    return response.data;
  },

  // Cek status API
  getApiStatus: async () => {
    const response = await api.get('/status');
    return response.data;
  }

};

module.exports = AuthModel;
