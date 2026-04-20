// ============================================
// controllers/cartController.js - Controller Keranjang
// ============================================

const CartModel = require('../models/cartModel');

const cartController = {

  // POST /cart/create - Buat keranjang baru
  createCart: async (req, res) => {
    try {
      const data = await CartModel.createCart();
      req.session.cartId = data.cartId;
      req.flash('success', `✅ Keranjang baru berhasil dibuat! Cart ID: ${data.cartId}`);
      res.redirect('/cart');
    } catch (err) {
      req.flash('error', `Gagal membuat keranjang: ${err.message}`);
      res.redirect('/');
    }
  },

  // GET /cart - Tampilkan isi keranjang
  getCart: async (req, res) => {
    const cartId = req.session.cartId;
    if (!cartId) {
      return res.render('pages/cart/index', {
        title: 'Keranjang Belanja',
        cart: null,
        items: [],
        cartId: null
      });
    }
    try {
      const [cart, items] = await Promise.all([
        CartModel.getCart(cartId),
        CartModel.getCartItems(cartId)
      ]);
      res.render('pages/cart/index', {
        title: 'Keranjang Belanja',
        cart,
        items,
        cartId
      });
    } catch (err) {
      req.flash('error', `Gagal mengambil keranjang: ${err.message}`);
      res.render('pages/cart/index', {
        title: 'Keranjang Belanja',
        cart: null,
        items: [],
        cartId
      });
    }
  },

  // POST /cart/items - Tambah item ke keranjang
  addItem: async (req, res) => {
    try {
      const cartId = req.session.cartId;
      if (!cartId) {
        req.flash('error', '⚠️ Buat keranjang dulu sebelum menambah produk!');
        return res.redirect('/products');
      }
      const { productId, quantity } = req.body;
      await CartModel.addItemToCart(cartId, productId, quantity || 1);
      req.flash('success', '✅ Produk berhasil ditambahkan ke keranjang!');
      res.redirect('/cart');
    } catch (err) {
      req.flash('error', `Gagal menambah produk: ${err.message}`);
      res.redirect('/cart');
    }
  },

  // PATCH /cart/items/:itemId - Update quantity item
  updateItem: async (req, res) => {
    try {
      const cartId = req.session.cartId;
      const { itemId } = req.params;
      const { quantity } = req.body;
      await CartModel.updateItemQuantity(cartId, itemId, quantity);
      req.flash('success', '✅ Jumlah item berhasil diperbarui!');
      res.redirect('/cart');
    } catch (err) {
      req.flash('error', `Gagal update item: ${err.message}`);
      res.redirect('/cart');
    }
  },

  // PUT /cart/items/:itemId - Ganti produk di keranjang
  replaceItem: async (req, res) => {
    try {
      const cartId = req.session.cartId;
      const { itemId } = req.params;
      const { productId, quantity } = req.body;
      await CartModel.replaceItemInCart(cartId, itemId, productId, quantity || 1);
      req.flash('success', '✅ Produk berhasil diganti!');
      res.redirect('/cart');
    } catch (err) {
      req.flash('error', `Gagal mengganti produk: ${err.message}`);
      res.redirect('/cart');
    }
  },

  // DELETE /cart/items/:itemId - Hapus item dari keranjang
  deleteItem: async (req, res) => {
    try {
      const cartId = req.session.cartId;
      const { itemId } = req.params;
      await CartModel.deleteItem(cartId, itemId);
      req.flash('success', '✅ Item berhasil dihapus dari keranjang!');
      res.redirect('/cart');
    } catch (err) {
      req.flash('error', `Gagal menghapus item: ${err.message}`);
      res.redirect('/cart');
    }
  },

  // POST /cart/clear - Hapus cart dari session
  clearCart: async (req, res) => {
    req.session.cartId = null;
    req.flash('success', '🗑️ Keranjang berhasil direset!');
    res.redirect('/cart');
  }

};

module.exports = cartController;
