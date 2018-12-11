<template>
  <div>

    <section :id="`vue-flex-carousel-${_uid}`" :class="['carousel', carouselClasses]" v-show="carousel.carouselReady">

      <!-- Top Nav - Outside -->
      <flex-navbar location="top" position="outside"/>

      <div class="carousel__inner-wrap">

        <!-- Left Side Nav - Outside -->
        <flex-navbar location="left" position="inside"/>

        <div class="carousel__inner bg-grey-light border border-grey rounded p-4 relative">

          <!-- Left Side Nav - Inside -->
          <flex-navbar location="left" position="inside"/>

          <div class="carousel_stage-wrap relative p-1 bg-grey border border-grey-dark">

            <!-- Top Inside Nav -->
            <flex-navbar location="top" position="inside" class="z-10"/>

            <!-- STAGE -->
            <flex-stage/>

            <!-- Bottom Nav - Inside -->
            <flex-navbar location="bottom" position="inside" class="z-10"/>

          </div>

          <!-- Right Side Nav - Inside -->
          <flex-navbar location="right" position="inside"/>

        </div>

        <!-- Right Side Nav - Outside -->
        <flex-navbar location="right" position="outside"/>

      </div>

      <!-- Bottom Nav - Outside -->
      <flex-navbar location="bottom" position="outside"/>

      <!-- NOTE: Container to allow slotted slides to render so we can extract the slide data we need. -->
      <!-- This container should NEVER be displayed. Slides are processed on init and rendered manually above. -->
      <div v-show="false">
        <slot/>
      </div>

    </section>

    <!-- SANDBOX CONTROLS -->
    <carousel-sandbox/>

  </div>
</template>

<script>
import flexCarousel from '../mixins/flexCarousel'
import carouselProps from '../mixins/carouselProps'

import { bus, events } from '../event-bus'

import FlexStage from './FlexStage'
import FlexNavbar from './FlexNavbar'
import CarouselSandbox from './sandbox/SandboxContainer'

export default {
  name: 'flex-carousel',

  mixins: [flexCarousel, carouselProps],

  components: { FlexStage, FlexNavbar, CarouselSandbox },

  computed: {
    navs() {
      return this.carousel.navLocations
    },
    activeSlide() {
      return this.store.getters('activeSlide')
    },
    carouselClasses() {
      let classes = []

        // props = this.carousel,
        // carouselShadows = Object.keys(props).filter((key) => (
        //   (key == 'carouselShadow' & props[key] != 'none')
        //   || (key == 'carouselShadowInner' & props[key] != 'none')
        // ))

      // console.log(carouselShadows)

      // if (carouselShadows) {
      //   classes.push(`shadow-${carouselShadow}`)
      // }
      // if (carouselShadowInner != 'none') {
      //   classes.push(`shadow-${carouselShadow}`)
      // }

      return classes
    }
  },

  methods: {
    _attachEventListeners() {
      let vm = this
      // api callbacks
      Object.keys(events.callbacks).forEach(
        (key) => bus.$on(events.callbacks[key], (data) => vm.$emit(events.callbacks[key], data))
      )
    }
  },

  mounted() {
    // attach event listeners
    if (!this.$isServer) { // CICS TODO: understand isServer better
      this._attachEventListeners()
    }

    // var width = 100, // width of a progress bar in percentage
    //     perfData = window.performance.timing, // The PerformanceTiming interface
    //     EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart), // Calculated Estimated Time of Page Load which returns negative value.
    //     time = parseInt((EstimatedTime/1000)%60)*100; //Converting EstimatedTime from miliseconds to seconds.
    //
    // console.log(time)

    // let carouselShadows = this.userConfig('carousel', 'shadow')
    // console.log(carouselShadows)
  },

  created() {
    // initialize carousel
    let vm = this
    this.store.dispatch('init', vm)
      .then(() => {
        // commit carouselReady
        vm.store.commit('setCarouselReady', true)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  beforeDestroy() {
    // CICS TODO: detach event listeners - not needed for callbacks b/c they are just $emit calls
  }

}
</script>

<style lang="scss" scoped>
.carousel {


}

// SHADOWS
.shadow {
  &-sm { @apply .shadow }
  &-inner-sm { @apply .shadow-inner }
  // NOTE: other shadow classess are being custom generated in tailwindcss.js - i.e. shadow-inner-md/lg
}

// TRANSITIONS
.fade-enter-active, .fade-leave-active {
  transition: opacity 500ms ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.bounce-enter-active {
  animation: bounce-in .4s;
}
.bounce-leave-active {
  animation: bounce-in .4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
