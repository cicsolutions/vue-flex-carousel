<template>
  <div>

    <section :id="`vue-flex-carousel-${_uid}`" :class="[htmlBlock, cssModifiers]" v-show="carousel.carouselReady">

      <!-- Top Nav - Outside -->
      <flex-navbar v-if="showNavbar('top-outside')" location="top" position="outside"/>

      <div class="flex-carousel__inner-wrap">

        <!-- Left Side Nav - Outside -->
        <flex-navbar v-if="showNavbar('left-outside')" location="left" position="outside"/>

        <div class="flex-carousel__inner">

          <!-- Left Side Nav - Inside -->
          <flex-navbar v-if="showNavbar('left-inside')" location="left" position="inside"/>

          <div class="flex-carousel_stage-wrap">

            <!-- Top Inside Nav -->
            <flex-navbar v-if="showNavbar('top-inside')" location="top" position="inside"/>

            <!-- STAGE -->
            <flex-stage/>

            <!-- Bottom Nav - Inside -->
            <flex-navbar v-if="showNavbar('bottom-inside')" location="bottom" position="inside"/>

          </div>

          <!-- Right Side Nav - Inside -->
          <flex-navbar v-if="showNavbar('right-inside')" location="right" position="inside"/>

        </div>

        <!-- Right Side Nav - Outside -->
        <flex-navbar v-if="showNavbar('right-outside')" location="right" position="outside"/>

      </div>

      <!-- Bottom Nav - Outside -->
      <flex-navbar v-if="showNavbar('bottom-outside')" location="bottom" position="outside"/>

      <!-- NOTE: Container to allow slotted slides to render so we can extract the slide data we need. -->
      <!-- This container should NEVER be displayed. Slides are processed on init and rendered manually above. -->
      <div class="slides_preloader" v-show="false">
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
    // navs() {
    //   return this.carousel.navbars
    // },
    activeSlide() {
      return this.store.getters('activeSlide')
    },
    cssModifiers() {
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
    },
    showNavbar() {
      return (loc) => {

        let navbar = loc.split('-'),
          navbarLocation = navbar[0],
          navbarPosition = navbar[1]

        // NOTE: this logic is a bit abstract and may be hard to follow, so here are some notes!

        return (
          // target more-specific strings first - exact matches found for location(outside/inside)
          (this.carousel.navbars.includes(`${navbarLocation}(${navbarPosition})`))
          ||
          // target top/bottom/left/right location(outside) settings - because position outside is the default
          (this.carousel.navbars.includes(navbarLocation)
            && navbarPosition == 'outside'
            && !this.carousel.navbars.includes(`${navbarLocation}(inside)`)
          )
          ||
          // target sides location, wich really applies to locations left and right combined
          (this.carousel.navbars.includes('sides')
            && ((navbarLocation == 'left') || (navbarLocation == 'right')) // locations left and right combined
            && (
              // inside
              (navbarPosition == 'inside'
                && this.carousel.navbars.includes('sides(inside)'))
              ||
              // outside
              (navbarPosition == 'outside'
                && !this.carousel.navbars.includes('sides(inside)'))
            )
          )
        )

      }
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

.flex-carousel {
  position: relative;
  display: flex;
  flex-direction: column;

  z-index: 1; // pulls carousel above the sandbox container

  &--shadow-sm {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
  }
  &--shadow-md {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08);
  }
  &--shadow-lg {
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }

  &--shadow-inner-sm {
    box-shadow: inset 0 0 6px -2px rgba(0,0,0,0.5);
  }
  &--shadow-inner-md {
    box-shadow: inset 0 0 25px -6px rgba(0,0,0,0.5);
  }
  &--shadow-inner-lg {
    box-shadow: inset 0 0 50px -10px rgba(0,0,0,0.5);
  }

}

.flex-carousel__inner-wrap {
  display: flex;
}
.flex-carousel__inner {
  position: relative;

  // @apply .bg-grey-light .border .border-grey .rounded .p-4; // framed theme
}
.flex-carousel__stage-wrap {
  position: relative;
  z-index: 0;

  @applly .p-1 .bg-grey .border .border-grey-dark; // theme framed
}
.flex-carousel__stage {

}
// SHADOWS - // TODO: make this into a scss mixin/function?
// &--shadow-sm {
//   box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
// }
// &--shadow-md {
//   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08);
// }
// &--shadow-lg {
//   box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
// }
//
// &--shadow-inner-sm {
//   box-shadow: inset 0 0 6px -2px rgba(0,0,0,0.5);
// }
// &--shadow-inner-md {
//   box-shadow: inset 0 0 25px -6px rgba(0,0,0,0.5);
// }
// &--shadow-inner-lg {
//   box-shadow: inset 0 0 50px -10px rgba(0,0,0,0.5);
// }

.slides_preloader {
  height: 0;
  width: 0;
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
