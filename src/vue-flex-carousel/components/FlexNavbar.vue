<template>
  <div :class="['vue-flex-carousel__nav border border-teal', containerClasses]" v-if="showNavbar">

      <flex-button action="go-prev-slide"/><!-- v-if="!hideArrows" -->

      <div class="vue-flex-carousel__dot-nav"> <!-- v-if="!hideDots" -->
        <flex-button action="go-to-slide" v-for="(dot, index) in pagesCount" :key="index" :index="index"/>
      </div>

      <flex-button action="go-next-slide"/><!-- v-if="!hideArrows" -->

  </div>
</template>

<script>
import flexCarousel from '../mixins/flexCarousel'
import FlexButton from './FlexButton'

export default {
  name: 'flex-navbar',

  mixins: [flexCarousel],

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

  computed: {
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
    showNavbar() {
      // return (nav) => {
      //   // CICS TODO: noodle on it.  Is there a way to optimize/simplify this logic?
      //   return (
      //     // top-outside
      //     (nav == 'top-outside'
      //       && (this.navs == 'top'
      //         || (this.navs.includes('top') && !this.navs.includes('top(inside)'))
      //         || (this.navs.includes('top(outside)') && this.navs.includes('top(inside)'))
      //       )
      //     ) ||
      //
      //     // top-inside
      //     (nav == 'top-inside' && this.navs.includes('top(inside)')) ||
      //
      //     // bottom-inside
      //     (nav == 'bottom-inside' && this.navs.includes('bottom(inside)')) ||
      //
      //     // bottom-outside
      //     (nav == 'bottom-outside'
      //       && (this.navs == 'bottom'
      //         || (this.navs.includes('bottom') && !this.navs.includes('bottom(inside)'))
      //         || (this.navs.includes('bottom(outside)') && this.navs.includes('bottom(inside)'))
      //       )
      //     ) ||
      //
      //     // sides-outside
      //     (nav == 'sides-outside'
      //       && (this.navs == 'sides'
      //         || (this.navs.includes('sides') && !this.navs.includes('sides(inside)'))
      //         || (this.navs.includes('sides(outside)') && this.navs.includes('sides(inside)')))
      //     ) ||
      //
      //     // sides-inside
      //     (nav == 'sides-inside' && this.navs.includes('sides(inside)'))
      //   )
      // }
      return false
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
.vfcarousel__nav {

}
</style>
