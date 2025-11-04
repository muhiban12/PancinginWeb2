<template>
    <div class="login-page">
      <h2>Login</h2>
  
      <input type="text" placeholder="Username">
      <input type="password" placeholder="Password">
  
      <button>Login</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginView"
  }
  </script>
  
  <style scoped>
  .login-page {
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
  