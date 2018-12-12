<template>
  <button
    role="button"
    :class="[htmlBlock, cssModifiers,
      {
        /* 'is-hidden': isHidden, */
        /* 'is-active': isActive */
      }]"
    @click="onClick"
    :title="title"
    :aria-label="title"
    >
    <!-- @mouseover="onMouseover"
    @mouseout="onMouseout"
    :style="buttonStyles" -->

    <slot><span v-html="label"/></slot>
  </button>
</template>

<script>
import flexCarousel from '../mixins/flexCarousel'

export default {
  name: 'flex-button',

  mixins: [flexCarousel],

  props: {
    action: {
      type: String,
      default: 'go-to-slide' // or go-prev-slide or go-next-slide
    },
    index: {
      type: Number,
      default: null
    }
  },

  computed: {
    goAction() {
      let actionArray = this.action.split('-'),
        goAction = actionArray[1] // to/prev/next

      return goAction
    },
    type() {
      return this.goAction == 'to' ? 'dot' : this.goAction
    },
    title() {
      let title = ''

      // CICS NOTE: if we were using previous for our prop names instead of prev, we could avoid this type of switch statement
      // CICS TODO: is there a createive way to change it under the hood so we get the best for the user and the app logic?
      switch(this.type) {
        case 'prev':
          title = `Previous Slide`
          break;
        case 'next':
          title = `Next Slide`
          break;
        case 'dot':
          title = `Go To Slide ${this.index + 1}`
          break;
      }

      return title
    },
    label() {
      // CICS TODO FEATURE: set this up to accept a custom string that will interpret data (i.e. "Go to ${element} #${index}")

      // NOTE: this label = '' check directly targets user having set the prop to an empty string
      // if no label, default to button title, otherwise return the label from the carousel props
      return (
        (this.carousel[`${this.type}Label`] == '') ?
          this.title
          :this.carousel[`${this.type}Label`]
      )
    },
    cssModifiers() {
      let classes = [`${this.htmlBlock}--${this.type}`]

      return classes
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

        let element = 'slide', // CICS TODO: for now -- will be dynamic soon!
          index = this.goAction == 'to' ? this.index : null // we need to pass the index if action is goTo()

        this.store.dispatch('go', { action: this.goAction, element, index })
      }
      return null // CICS NOTE: just until we get the shuffle plugged in
    },
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

  }
}
</script>

<style lang="scss" scoped>
.flex-button {
  display: flex;
  align-items: center;
  justify-content: center;

  &--prev, &--next {
    padding: 0.5rem;
  }
  // &--next {
  //
  // }
  &--dot {
    padding: 0.5rem;
  }

  span {
    display: inherit;
  }
}

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

</style>
