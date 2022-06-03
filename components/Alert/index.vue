<template>
  <div :class="alertClasses">
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script>
import './style.scss'
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    danger: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    alertClasses() {
      return [
        'alert',
        {
          alert_danger: this.danger,
        },
      ]
    },
  },
}
</script>

<style>
</style>