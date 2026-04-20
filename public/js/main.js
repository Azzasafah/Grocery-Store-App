// public/js/main.js - JavaScript Utama

// Auto-hide flash messages setelah 5 detik
document.addEventListener('DOMContentLoaded', () => {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  });

  // Konfirmasi sebelum hapus
  const deleteForms = document.querySelectorAll('[data-confirm]');
  deleteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const msg = form.getAttribute('data-confirm') || 'Yakin ingin menghapus?';
      if (!confirm(msg)) e.preventDefault();
    });
  });
});
