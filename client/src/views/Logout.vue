<template>
  <v-overlay :value="overlay">
    <v-progress-circular
        indeterminate
        color="deep-orange accent-4"
        width="10"
        size="80"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "Logout",
  data: () => {
    return {
      overlay: true
    }
  },
  created() {
    localStorage.removeItem('token')
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }
}
</script>

<style scoped>

</style>