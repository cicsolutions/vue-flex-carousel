<template>
  <div>carousel input</div>
</template>

<script>
export default {
  props: {

    // carousel
    slideDirection: { // CICS NOTE: this should be totally handled by flexbox and no javascript math/logic!
      type: String,
      default: 'forward' // options = forward/backward
    },
    slidesPerPage: {
      type: Number,
      default: 1
    },
    scrollElement: {
      type: String,
      default: 'Slide' // options = slide/page - system logic needs it to be capitalized, but we force capitalize on init method
    },
    loop: { // CICS TODO: change this to cycle
      type: Boolean,
      default: false
    },
    easing: {
      type: String,
      default: "ease-in-out"
    },

    // autoplay
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayTimeout: {

    },
    autoplayHoverPause: {
      type: Boolean,
      default: true
    },

    // navigation - dots and arrows
    navLocations: {
      type: String,
      default: null
    },
    /*
      navLocations example config strings:
        sides(inside)_bottom-dots_top-dots or top-dots_bottom-dots_sides(inside) or bottom-dots_sides(inside)_top-dots --> all produce the same resulting layout

      top
      top(inside)
      top(outside)
      top-arrows
      top-dots
      top-arrows--left
      top-arrows--right
      top-dots--left
      top-dots--right

      bottom
      bottom(inside)
      bottom(outside)
      bottom-arrows
      bottom-dots
      bottom-arrows--left
      bottom-arrows--right
      bottom-dots--left
      bottom-dots--right

    */

    // CICS TODO: should probably remove the 'nav' prefix to make for cleaner prop setting for the user
    navDotLabel: {
      type: String,
      default: `<svg width="10px" height="10px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg>`
    },
    navDotTrigger: {
      type: String,
      default: 'click' // (click/mouseover/none) - none, in case the user wants to display the dots purely for a visual effect?
    },
    navDotMagnifyOnHover: {
      type: Boolean,
      default: true
    },
    navDotColors: {
      type: Array,
      default: () => ([]) // base/hover/active - leave unset to control colors via css overrides
    },
    navPrevLabel: {
      type: String,
      default: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z"/></svg>' //'&#9664', '&laquo;'
    },
    navNextLabel: {
      type: String,
      default: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"/></svg>' //'&#9654', '&raquo;'
    },
    navArrowTrigger: {
      type: String,
      default: 'click' // (click/mouseover)
    },
    navArrowColors: {
      type: Array,
      default: () => ([]) // default/hover/disabled - leave unset to control colors via css overrides
    },
    showPrevNextOnHover: { // CICS TODO: this will override any settings related to 'sides' in the navLocations setting, and force sides(inside)
      type: Boolean,
      default: false
    },

    // dimensions
    width: {
      type: [String, Number],
      default: 'auto'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },

    // stage
    stageWidth: {
      type: [String, Number],
      default: 'auto'
    },
    stageHeight: {
      type: [String, Number],
      default: 'auto'
    },
    stageBgColor: {
      type: String,
      default: null
    },

    // external navigation params
    goToSlide: {
      type: Number,
      default: 0
    },
    // goToPage: {
    //   type: Number,
    //   default: 0
    // },

    slides: {
      type: Array,
      default: null
    },

    // transitions
    transitionName: {
      type: String,
      default: 'fade'
    },
    transitionOnInitialRender: {
      type: Boolean,
      default: true
    }

    // responsive

  },
}
</script>

<style lang="scss">
</style>
