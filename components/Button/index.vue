<template>
  <button :class="buttonClasses" @click="$emit('onClick')">
    <slot />
  </button>
</template>

<script>
import './style.scss'
export default {
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      return [
        'btn',
        {
          btn_primary: this.primary,
          btn_secondary: this.secondary,
          btn_block: this.block,
        },
      ]
    },
  },
}
</script>