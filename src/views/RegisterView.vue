<template>
    <div class="register-page">
      <h2>Register</h2>
  
      <input type="text" placeholder="Username">
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Password">
  
      <button>Daftar</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "RegisterView"
  }
  </script>
  
  <style scoped>
  .register-page {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 50px auto;
    gap: 10px;
  }
  button {
    padding: 8px;
    cursor: pointer;
  }
  </style>
  