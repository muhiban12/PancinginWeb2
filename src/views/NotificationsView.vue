<template>
  <NotificationModal :visible="true" @close="handleClose" />
</template>

<script>
import NotificationModal from '@/components/NotificationModal.vue'

export default {
  components: { NotificationModal },
  methods: {
    handleClose() {
      this.$router.push('/') // atau ke halaman lain sesuai kebutuhan
    }
  }
}
</script>