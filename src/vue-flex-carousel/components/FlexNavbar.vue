<template>
  <div :class="['vue-flex-carousel__nav border border-teal', containerClasses]">

      <flex-button action="go-prev-slide"/><!-- v-if="!hideArrows" -->

      <div class="vue-flex-carousel__dot-nav"> <!-- v-if="!hideDots" -->
        <flex-button action="go-to-slide" v-for="(dot, index) in pagesCount" :key="index" :index="index"/>
      </div>

      <flex-button action="go-next-slide"/><!-- v-if="!hideArrows" -->

  </div>
</template>

<script>
import store from '../store'
import FlexButton from './FlexButton'

export default {
  name: 'flex-navbar',

  props: {
    location: {
      type: String,
      default: '' // top/bottom
    },
    position: {
      type: String,
      default: '' // outside/inside
    }
  },

  components: { FlexButton },

  data: () => ({ store }),

  computed: {
    carousel() {
      return this.store.state
    },
    pagesCount() {
      this.store.getters('pagesCount')
    },
    navLocations() {
      return this.carousel.navLocations
    },
    containerClasses() {
      let classes = `nav__${this.location}-${this.position}`

      // CICS NOTE: can't use .some() here, will need to itterate the contexts to make sure we have an exact top or bottom match b/c user could configure top and bottom options
      if (this.contexts.locations.some(context => this.navLocations.includes(context))) {
        if (this.navLocations.includes(`--left`)) {
          classes += '--left'
        }
      } else if (this.contexts.locations.some(context => this.navLocations.includes(context))) {
        if (this.navLocations.includes(`--right`)) {
          classes += '--right'
        }
      }

      return classes
    },
    hideArrows() { // faster to check when to hide b/c arrows shown by default with less-specific settings like 'top', 'bottom'
      return (this.contexts.dots.some(context => this.navLocations.includes(context))
          && !this.contexts.arrows.some(context => this.navLocations.includes(context)))
    },
    hideDots() { // faster to check when to hide b/c dots shown by default with less-specific settings like 'top', 'bottom'
      return (this.contexts.arrows.some(context => this.navLocations.includes(context))
        && !this.contexts.dots.some(context => this.navLocations.includes(context)))
    },
    contexts() {
      // CICS TODO: explain this logic in a note!!
      let location_contexts = [this.location, `${this.location}(${this.position})`],
        arrows_contexts = location_contexts.map(
          context => (`${context}-arrows`)
        ),
        dots_contexts = location_contexts.map(
          context => (`${context}-dots`)
        ),
        contexts = {
          locations: location_contexts,
          arrows: arrows_contexts,
          dots: dots_contexts
        }

      return contexts
    }
  },

  methods: {

  },

  mounted() {
    // console.log(this.pagesCount)
  },

  created() {

  }
}
</script>

<style lang="scss">
.vue-flex-carousel__nav {

}
</style>
