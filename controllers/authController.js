// ============================================
// controllers/authController.js - Controller Auth
// ============================================

const AuthModel = require('../models/authModel');

const authController = {

  // GET /auth - Halaman registrasi & kelola token
  getAuthPage: (req, res) => {
    res.render('pages/auth/index', {
      title: 'Autentikasi & Token',
      currentToken: req.session.accessToken || null
    });
  },

  // POST /auth/register - Daftar API client & simpan token
  registerClient: async (req, res) => {
    try {
      const { clientName, clientEmail } = req.body;
      const data = await AuthModel.registerClient(clientName, clientEmail);
      req.session.accessToken = data.accessToken;
      req.flash('success', `✅ Registrasi berhasil! Token disimpan di session.`);
      res.redirect('/auth');
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      req.flash('error', `Gagal registrasi: ${errMsg}`);
      res.redirect('/auth');
    }
  },

  // POST /auth/set-token - Set token manual
  setToken: (req, res) => {
    const { accessToken } = req.body;
    if (!accessToken || accessToken.trim() === '') {
      req.flash('error', '⚠️ Token tidak boleh kosong!');
      return res.redirect('/auth');
    }
    req.session.accessToken = accessToken.trim();
    req.flash('success', '✅ Access Token berhasil disimpan!');
    res.redirect('/auth');
  },

  // POST /auth/logout - Hapus token dari session
  clearToken: (req, res) => {
    req.session.accessToken = null;
    req.flash('success', '🗑️ Token berhasil dihapus dari session!');
    res.redirect('/auth');
  }

};

module.exports = authController;
