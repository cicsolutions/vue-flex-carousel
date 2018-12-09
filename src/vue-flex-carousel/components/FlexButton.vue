<template>
  <button
    role="button"
    ref="button"
    :class="['vue-carousel__btn', {
      'is-hidden': isHidden,
      'is-active': isActive
    }]"
    @click="onClick"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
    :style="buttonStyles"
    :title="buttonTitle"
    :aria-label="buttonTitle"
    >
    <!-- v-html="buttonContent" -->
    <slot><span v-html="buttonContent"></span></slot>
  </button>
</template>

<script>
import { store } from "../store"

export default {
  name: 'flex-button',

  props: {
    type: {
      type: String,
      default: 'dot'
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
    buttonContent() {
      switch (this.type) {
        case 'prev':
          return this.carousel.navPrevLabel
          break
        case 'next':
          return this.carousel.navNextLabel
          break
        case 'dot': default:
          return this.carousel.navDotLabel
          break
      }
    },
    buttonTitle() {
      let label = '',
        scrollElement = this.carousel.scrollElement
      switch (this.type) {
        case 'prev':
          label = `Previous ${scrollElement}`
          break;
        case 'next':
          label = `Next ${scrollElement}`
          break;
        case 'dot':
          label = `${scrollElement} ${this.index + 1}`
          break;
      }
      return label
    },
    buttonStyles() {
      // CICS NOTE: setting button styles via a string rather than this.button.style b/c computed props dont' have access to $refs.  Could also use method and nextTick, but ...
      let styles = null
      switch (this.type) {
        case 'prev': case 'next':
          // set default arrow color
          styles = `color: ${this.carousel.navArrowColors[0]}; `

          // let navs = this.carousel.navLocations
          // if (navs.includes('arrows_left') || navs.includes('dots_right')) {
          //   if (this.type == 'prev') {
          //     styles += 'order: 1;'
          //   } else if (this.type == 'next') {
          //     styles += 'order: 2;'
          //   }
          // } else if (navs.includes('arrows_right') || navs.includes('dots_left')) {
          //   if (this.type == 'prev') {
          //     styles += 'order: 2;'
          //   } else if (this.type == 'next') {
          //     styles += 'order: 3;'
          //   }
          // }
          break
        case 'dot': default:
          // set dot color - active color if active or default color
          let dotColors = this.carousel.navDotColors,
            color = this.isActive ? dotColors[2] : dotColors[0];

          styles = `color: ${color};`
          break
      }
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
    goToPrevious() {
      // this.store.dispatch('goToPrevious')
      // if (this.previous !== false) {
        this.store.commit('setCurrentIndex', this.store.getters('previous'))
      // }
    },
    goToNext() {
      // this.store.dispatch('goToNext')
      this.store.commit('setCurrentIndex', this.store.getters('next'))
    },
    goTo(index) {
      // this.store.dispatch('goTo', index)
      this.store.commit('setCurrentIndex', index)
    },
    onClick() {
      // CICS TODO: is there a way to optimize this logic?
      switch (this.type) {
        case 'prev':
          return this.carousel.navArrowTrigger == 'click' ? this.goToPrevious() : null
          break
        case 'next':
          return this.carousel.navArrowTrigger == 'click' ? this.goToNext() : null
          break
        case 'dot': default:
          return this.carousel.navDotTrigger == 'click' ? this.goTo(this.index) : null
          break
      }
    },
    onMouseover() {
      if (['prev', 'next'].includes(this.type)) {
        let colors = this.carousel.navArrowColors
        this.button.style.color = colors[1]

        if (this.carousel.navArrowTrigger == 'mouseover') {
          if (this.type == 'prev') {
            this.goToPrevious()
          } else if (this.type == 'next') {
            this.goToNext()
          }
        }
      }
      if (this.type == 'dot') {
        let colors = this.carousel.navDotColors
        this.button.style.color = this.isActive ? colors[2] : colors[1]

        if (this.carousel.navDotTrigger == 'mouseover') {
          this.goTo(this.index)
        }
      }
    },
    onMouseout() {
      if (this.type == 'dot') {
        let colors = this.carousel.navDotColors
        this.button.style.color = this.isActive ? colors[2] : colors[0]
      }
      if (['prev', 'next'].includes(this.type)) {
        let colors = this.carousel.navArrowColors
        this.button.style.color = colors[0]
      }
    }
  },

  mounted() {
    this.button = this.$refs.button
  }
}
</script>
