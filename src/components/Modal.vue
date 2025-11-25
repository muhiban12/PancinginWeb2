<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2>{{ title }}</h2>
      <slot></slot>
      <button class="btn-action" @click="$emit('close')">Tutup</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: "" }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.btn-action {
  margin-top: 1rem;
  background: #003366;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}
.btn-action:hover {
  background: #0055aa;
}
</style>