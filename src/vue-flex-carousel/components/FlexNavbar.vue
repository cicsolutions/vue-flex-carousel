<template>
  <div :class="['vfcarousel__nav border-2 border-red', navbarClasses]" v-show="showNavbar">

      <flex-button action="go-prev-slide"/><!-- v-if="!hideArrows" -->

      <div class="vfcarousel__dotnav"> <!-- v-if="!hideDots" -->
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
      default: '' // top/bottom/sides/left/right
    },
    position: {
      type: String,
      default: '' // outside/inside
    }
  },

  components: { FlexButton },

  computed: {
    pagesCount() {
      return this.store.getters('pagesCount')
    },
    navLocations() {
      return this.carousel.navLocations
    },
    navbarClasses() {
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

      // NOTE: this logic is a bit abstract and may be hard to follow, so here are some notes!

      // navbars positioned "inside" are targeted with the most specificity (i.e. 'top(inside)' or 'bottom(inside)' or 'sides(inside)')
      // and this means that the "outside" navbars are displayed more frequently
      // through less-specific string options in the navLocations prop (i.e. 'top' or 'bottom' or 'sides' will display the "outside" positions)

      return (
        // if a simple string like 'top' or 'bottom' or 'sides'
        // and this navbars' postion is 'outside' (b/c outside is the default)
        (this.navLocations == this.location) && (this.position == 'outside')
        ||
        // if this navbar's position is 'inside', the string must have (inside)
        (this.position == 'inside' && this.navLocations.includes(`${this.location}(inside)`))

        // // if exact match
        // (this.navLocations == `${this.location}(${this.position})`)
        // ||
        // // if mathcing location and not specificalyl inside - then go ahead and display the outside
        // (this.navLocations.includes(this.position) && !this.navLocations.includes(`${this.location}(inside)`))
        // ||
        // // if both inside and outside are displayed
        // (this.navLocations.includes(`${this.location}(outside)`) && this.navLocations.includes(`${this.location}(inside)`))

      )

      // let rules = {
      //   directMatch: this.navLocations.includes(`${this.location}(${this.position})`),
      //   looseMatch: (
      //     this.navLocations == this.location
      //       || (this.navLocations.includes(this.position) && !this.navLocations.includes(`${this.location}(inside)`))
      //       || (this.navLocations.includes(`${this.location}(outside)`) && this.navLocations.includes(`${this.location}(inside)`))
      //   )
      // }

      // if any of the rules return true, we are good to go!
      // check each key to see of the values return as true :)
      // return Object.keys(rules).some((key) => rules[key])

      // return (


        // so let's get the easy ones out of the way :) i.e. direct matches

        //   // top-outside
        //   (this.navLocations == 'top'
        //       || (this.navLocations.includes('top') && !this.navLocations.includes('top(inside)'))
        //       || (this.navLocations.includes('top(outside)') && this.navLocations.includes('top(inside)'))
        //     )
        //   ) ||
        //
        //   // bottom-outside
        //   ((this.navLocations == 'bottom'
        //       || (this.navLocations.includes('bottom') && !this.navLocations.includes('bottom(inside)'))
        //       || (this.navLocations.includes('bottom(outside)') && this.navLocations.includes('bottom(inside)'))
        //     )
        //   ) ||
        //
        //   // sides-outside
        //   ((this.navLocations == 'sides'
        //       || (this.navLocations.includes('sides') && !this.navLocations.includes('sides(inside)'))
        //       || (this.navLocations.includes('sides(outside)') && this.navLocations.includes('sides(inside)')))
        //   ) ||

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

<style lang="scss" scoped>
.vfcarousel {

  &__nav {

  }

  &__dotnav {

  }
}
</style>
