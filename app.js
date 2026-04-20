// ============================================
// app.js - Entry Point Aplikasi Express
// ============================================
// Ini adalah file utama yang menjalankan server Express.
// Semua konfigurasi middleware dan route dikumpulkan di sini.

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

// Import semua route
const indexRoutes = require('./routes/indexRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE SETUP
// ============================================

// Set EJS sebagai template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Parse request body (form & JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method Override: agar HTML form bisa pakai PUT & DELETE
app.use(methodOverride('_method'));

// Session: untuk menyimpan data sementara (cartId, token, dsb.)
app.use(session({
  secret: 'grocery-secret-key-123',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 hari
}));

// Flash Messages: pesan notifikasi (success, error)
app.use(flash());

// Global Variables: tersedia di semua EJS views
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('success');
  res.locals.errorMsg = req.flash('error');
  res.locals.cartId = req.session.cartId || null;
  res.locals.accessToken = req.session.accessToken || null;
  next();
});

// ============================================
// ROUTES
// ============================================
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);

// ============================================
// ERROR HANDLING
// ============================================
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Halaman Tidak Ditemukan' });
});

app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).render('pages/error', { title: 'Server Error', error: err.message });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log('============================================');
  console.log('🛒  Simple Grocery Store API - Express MVC');
  console.log('============================================');
  console.log(`✅  Server berjalan di: http://localhost:${PORT}`);
  console.log(`📁  Mode: Development (nodemon aktif)`);
  console.log('============================================');
});

module.exports = app;
