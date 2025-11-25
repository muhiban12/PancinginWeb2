<template>
  <section class="login-page">
    <div class="shark-container">
      <img src="@/assets/Hiu.png" alt="Shark" class="shark-image" />

      <!-- Form login di dalam mulut hiu -->
      <form class="login-form" @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>

    <router-link to="/register" class="register-link">Belum punya akun? Daftar di sini</router-link>
  </section>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
  handleLogin() {
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

      if (registeredUser &&
          this.username === registeredUser.username &&
          this.password === registeredUser.password) {
        
        // Simpan token & user aktif
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify({
          name: registeredUser.name,
          email: registeredUser.email
        }));

        this.$router.push('/');
      } else {
        alert('Username atau password salah, atau akun belum terdaftar');
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #0077b6, #00b4d8);
}

.shark-container {
  position: relative;
  display: inline-block;
}

.shark-image {
  width: 100%;
  max-width: 500px;
  display: block;
}


.login-form {
  position: absolute;
  top: 64%; /* Sesuaikan agar pas di mulut hiu */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 200px;
  /* background: rgba(255, 255, 255, 0.9); */
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}


.login-form input,
.login-form button {
  padding: 3px;
  border-radius: 8px;
  border: none;
}

.login-form button {
  background-color: #03045e;
  color: white;
  cursor: pointer;
}


.register-link {
  margin-top: 20px;
  color: white;
  text-decoration: underline;
}
</style>