// ============================================
// models/apiConfig.js - Konfigurasi API
// ============================================
// Model ini bertugas sebagai "penghubung" ke API eksternal.
// Semua request HTTP ke Simple Grocery Store API dilakukan di sini.

const axios = require('axios');

// Base URL dari API - bisa diganti jika API berubah
const BASE_URL = 'https://simple-grocery-store-api.click';

// Buat instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

module.exports = { api, BASE_URL };
