// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET  /auth                → Halaman auth & token
// POST /auth/register       → Daftar API client
// POST /auth/set-token      → Set token manual
// POST /auth/clear          → Hapus token

router.get('/', authController.getAuthPage);
router.post('/register', authController.registerClient);
router.post('/set-token', authController.setToken);
router.post('/clear', authController.clearToken);

module.exports = router;
