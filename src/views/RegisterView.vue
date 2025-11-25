<template>
  <section class="register-page">
    <div class="form-container">
      <h2 class="mb-4">📝 Daftar Akun Baru</h2>

      <form @submit.prevent="handleRegister">
        <input type="text" v-model="name" placeholder="Nama Lengkap" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Daftar</button>
      </form>

      <router-link to="/login" class="login-link">Sudah punya akun? Login di sini</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    handleRegister() {
    // Simulasi registrasi sukses: simpan data user sementara
      localStorage.setItem('registeredUser', JSON.stringify({
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      }));

      // Setelah daftar, arahkan ke halaman login
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #caf0f8, #ade8f4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.form-container {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.login-link {
  margin-top: 16px;
  display: block;
  color: #0077b6;
  text-decoration: underline;
}
</style>