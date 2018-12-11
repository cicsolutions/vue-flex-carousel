<template>
  <div
    class="vue-flex-carousel__slide"
    :style="slideStyles"
    >
    <!-- @click="onClick" -->
    <!-- NOTE: TODO: not sure why the click event is getting added to the dom, but no console.log is happening when I click on the slide? -->

    <img :src="slide.src" alt="" v-if="slide.src">
    <!-- <div class="p-16 m-16">
      yeah buddy!
    </div> -->

  </div>
</template>

<script>
import flexCarousel from '../mixins/flexCarousel'
import { bus, events } from '../event-bus'

export default {
  name: 'flex-slide',

  mixins: [flexCarousel],

  props: {
    index: {
      type: Number,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  },

  computed: {
    slide() {
      // NOTE: we capture all the important data in carousel's init() function,
      // then we process it and save it to the store,
      // now we pass it in as the data prop
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
.vfcarousel {

  &__slide {
    // @apply ;

    img {
      @apply .block;
    }
  }
}
</style>
