<template>
    <div class="page">
      <h1>Daftar Spot Memancing 🎣</h1>
  
      <div class="spot-list">
        <div class="spot">
          <h3>Pantai Pangandaran</h3>
          <p>Lokasi: Jawa Barat</p>
          <button>Detail</button>
        </div>
  
        <div class="spot">
          <h3>Danau Ciburuy</h3>
          <p>Lokasi: Padalarang</p>
          <button>Detail</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FishingSpotView"
  }
  </script>
  
  <style scoped>
  .page { padding: 20px; }
  
  .spot-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .spot {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 6px;
  }
  
  button {
    margin-top: 5px;
  }
  </style>
  