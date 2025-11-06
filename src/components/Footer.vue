<template>
    <footer class="footer py-4" style="background: linear-gradient(90deg, #0083ff, #004aad);">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <!-- Nama Website -->
        <div class="footer-left fw-bold text-white mb-3 mb-md-0 fs-5">
          🎣 Pancingin
        </div>
  
        <!-- Sosial Media Icons -->
        <div class="footer-right d-flex gap-3">
          <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="text-white social-icon">
            <i class="bi bi-instagram" style="font-size: 1.4rem;"></i>
          </a>
          <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="text-white social-icon">
            <i class="bi bi-facebook" style="font-size: 1.4rem;"></i>
          </a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="text-white social-icon">
            <i class="bi bi-twitter" style="font-size: 1.4rem;"></i>
          </a>
          <a href="mailto:email@example.com" aria-label="Email" class="text-white social-icon">
            <i class="bi bi-envelope-fill" style="font-size: 1.4rem;"></i>
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
    /* Tambahan efek hover untuk icon */
  }
  
  .social-icon:hover {
    color: #ffdd57;
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
  </style>
  