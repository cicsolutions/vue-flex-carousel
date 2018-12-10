<template>
  <div
    class="vue-flex-carousel__slide"
    :style="slideStyles"
    >
    <!-- @click="onClick" -->
    <!-- NOTE: TODO: not sure why the click event is getting added to the dom, but no console.log is happening when I click on the slide? -->

    <!-- <img :src="slide.src" alt="" v-if="slide.src"> -->
    <div class="p-16 m-16">
      yeah buddy!
    </div>

  </div>
</template>

<script>
import { bus, events } from '../event-bus'

export default {
  name: 'flex-slide',

  props: {
    index: {
      type: Number,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    // src property will be used to render a single image per slide
    src: {
      type: String,
      default: null,
    }
  },

  computed: {
    slide() {
      return this.data
    },
    slideStyles() {
      let styles = null

      return styles
    }
  },

  methods: {
    onClick() {
      // let reportData = {
      //   event: e,
      //   // index: this.index
      // }
      console.log('clicked!')
      // bus.$emit(events.callbacks.onSlideClick, reportData)
    }
  },

  mounted() {
    // console.log(this.slide)
  },

  created() {

  }
}
</script>

<style lang="scss">
.vue-flex-carousel__slide {
  // @apply ;

  img {
    @apply .block;
  }
}
</style>
