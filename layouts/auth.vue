<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.setToken()
  },
  methods: {
    setToken() {
      const token = localStorage && localStorage.getItem('token')
      if (token) {
        this.$store.commit('user/setStatusLogin', true)
      }
    },
  },
}
</script>

<style>
</style>