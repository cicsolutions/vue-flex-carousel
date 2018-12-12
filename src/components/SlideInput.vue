<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import store from '../store'
// import { bus, events } from '../event-bus'

export default {
  name: 'slide-input',

  props: {
    bgColor: {
      type: String,
      default: null
    },
    bgImageUrl: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    caption: {
      type: String,
      default: null
    },
    innerHtml: {
      type: String,
      default: null
    },
    slideData: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({ store }),

  computed: {

  },

  methods: {

  },

  mounted() {

  },

  created() {

  }
}
</script>

<style lang="scss">
</style>
