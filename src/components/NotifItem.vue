<template>
  <div class="notif-item">
    <div class="icon">
      <img v-if="icon" :src="icon" alt="icon" />
    </div>
    <p>{{ label }}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,   // path PNG
    label: String
  }
}
</script>

<style scoped>
.notif-item {
  text-align: center;
  background: #e6f0ff;
  padding: 1rem;
  border-radius: 8px;
  color: #003366;
  font-weight: 500;
}
.icon img {
  width: 32px;   /* ukuran ikon */
  height: 32px;
  object-fit: contain;
}
</style>