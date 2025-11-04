<template>
    <div class="page">
      <h1>Booking Lapangan / Spot</h1>
  
      <div class="booking-card">
        <label>Pilih Spot:</label>
        <select>
          <option value="">Pilih tempat memancing</option>
          <option>Pantai Pangandaran</option>
          <option>Danau Ciburuy</option>
        </select>
  
        <label>Pilih Tanggal:</label>
        <input type="date">
  
        <label>Pilih Waktu:</label>
        <input type="time">
  
        <button>Booking Sekarang</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BookingView"
  }
  </script>
  
  <style scoped>
  .page {
    padding: 20px;
  }
  .booking-card {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  button {
    padding: 8px;
    cursor: pointer;
    background: #008cff;
    color: white;
    border: none;
  }
  </style>
  