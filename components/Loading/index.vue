<template>
  <div :class="['lds-ripple', { dark: dark }]">
    <div></div>
    <div></div>
  </div>
</template>

<script>
import './style.scss'
export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
</style>