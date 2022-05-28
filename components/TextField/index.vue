<template>
  <div class="form-group">
    <input
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue($event)"
      @keypress="keypress($event)"
      @keyup.enter="$emit('onEnter')"
    />
  </div>
</template>

<script>
import './style.scss'
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    hasPhoneNumber: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    updateValue(e) {
      const { value } = e.target
      this.$emit('input', value)
      this.$emit('onchange', value)
    },
    keypress(e) {
      if (this.hasPhoneNumber) {
        if (e.keyCode >= 48 && e.keyCode <= 57) {
        } else {
          e.preventDefault()
        }
      }
    },
  },
}
</script>

<style>
</style>