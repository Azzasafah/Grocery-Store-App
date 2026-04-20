// ============================================
// controllers/indexController.js
// ============================================
const AuthModel = require('../models/authModel');

const indexController = {

  // Halaman utama / Dashboard
  getHome: async (req, res) => {
    try {
      const status = await AuthModel.getApiStatus();
      res.render('pages/home', {
        title: '🛒 Grocery Store',
        apiStatus: status
      });
    } catch (err) {
      res.render('pages/home', {
        title: '🛒 Grocery Store',
        apiStatus: { status: 'ERROR' }
      });
    }
  }

};

module.exports = indexController;
