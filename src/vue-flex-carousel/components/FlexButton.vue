<template>
  <button
    role="button"
    ref="button"
    :class="['vue-flex-carousel__btn', {
      'is-hidden': isHidden,
      'is-active': isActive
    }]"
    @click="onClick"
    >
    <!-- @mouseover="onMouseover"
    @mouseout="onMouseout"
    :style="buttonStyles"
    :title="buttonTitle"
    :aria-label="buttonTitle" -->
    <slot><span v-html="buttonLabel"></span></slot>
  </button>
</template>

<script>
import store from "../store"

export default {
  name: 'flex-button',

  props: {
    action: {
      type: String,
      default: 'go-to-slide'
    },
    index: {
      type: Number,
      default: null
    }
  },

  data: () => ({ store }),

  computed: {
    carousel() {
      return this.store.state
    },
    buttonType() {
      return null
    },
    buttonLabel() {
      return null
    },
    buttonTitle() {
      let label = ''
        // scrollElement = this.carousel.scrollElement
      // switch (this.type) {
      //   case 'prev':
      //     label = `Previous ${scrollElement}`
      //     break;
      //   case 'next':
      //     label = `Next ${scrollElement}`
      //     break;
      //   case 'dot':
      //     label = `${scrollElement} ${this.index + 1}`
      //     break;
      // }
      return label
    },
    buttonStyles() {
      // CICS NOTE: setting button styles via a string rather than this.button.style b/c computed props dont' have access to $refs.  Could also use method and nextTick, but ...
      let styles = null
      // switch (this.type) {
      //   case 'prev': case 'next':
      //     // set default arrow color
      //     styles = `color: ${this.carousel.navArrowColors[0]}; `
      //
      //     // let navs = this.carousel.navLocations
      //     // if (navs.includes('arrows_left') || navs.includes('dots_right')) {
      //     //   if (this.type == 'prev') {
      //     //     styles += 'order: 1;'
      //     //   } else if (this.type == 'next') {
      //     //     styles += 'order: 2;'
      //     //   }
      //     // } else if (navs.includes('arrows_right') || navs.includes('dots_left')) {
      //     //   if (this.type == 'prev') {
      //     //     styles += 'order: 2;'
      //     //   } else if (this.type == 'next') {
      //     //     styles += 'order: 3;'
      //     //   }
      //     // }
      //     break
      //   case 'dot': default:
      //     // set dot color - active color if active or default color
      //     let dotColors = this.carousel.navDotColors,
      //       color = this.isActive ? dotColors[2] : dotColors[0];
      //
      //     styles = `color: ${color};`
      //     break
      // }
      return styles
    },
    isHidden() {
      return !this.carousel.carouselReady
        || (this.type == 'prev' && this.store.getters('previous') === false)
        || (this.type == 'next' && this.store.getters('next') === false)
    },
    isActive() {
      let scrollElement = this.carousel.scrollElement
      return this.type == 'dot' && this.index == this.carousel[`current${scrollElement}Index`]
    }
  },

  methods: {
    onClick() {
      if (this.action != 'shuffle') {
        let actionArray = this.action.split('-'),
          action = actionArray[1], // prev/next/to
          element = actionArray[2], // slide/page
          index = action == 'to' ? this.index : null // we need to pass the index if action is goTo()

        this.store.dispatch('go', { action, element, index })
      }
      return null // just until we get the shuffle plugged in
    }
    // onMouseover() {
    //   if (['prev', 'next'].includes(this.type)) {
    //     let colors = this.carousel.navArrowColors
    //     this.button.style.color = colors[1]
    //
    //     if (this.carousel.navArrowTrigger == 'mouseover') {
    //       if (this.type == 'prev') {
    //         this.goToPrevious()
    //       } else if (this.type == 'next') {
    //         this.goToNext()
    //       }
    //     }
    //   }
    //   if (this.type == 'dot') {
    //     let colors = this.carousel.navDotColors
    //     this.button.style.color = this.isActive ? colors[2] : colors[1]
    //
    //     if (this.carousel.navDotTrigger == 'mouseover') {
    //       this.goTo(this.index)
    //     }
    //   }
    // },
    // onMouseout() {
    //   if (this.type == 'dot') {
    //     let colors = this.carousel.navDotColors
    //     this.button.style.color = this.isActive ? colors[2] : colors[0]
    //   }
    //   if (['prev', 'next'].includes(this.type)) {
    //     let colors = this.carousel.navArrowColors
    //     this.button.style.color = colors[0]
    //   }
    // }
  },

  mounted() {
    // this.button = this.$refs.button
  }
}
</script>

<style lang="scss">
.vue-flex-carousel__btn {

}
</style>
