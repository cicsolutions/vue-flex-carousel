export default {

  props: {
    // carousel
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
    advanceDirection: { // CICS NOTE: this should be totally handled by flexbox and no javascript math/logic!
      type: String,
      default: 'forward' // options = forward/backward
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
    navbars: {
      type: String,
      default: ''
    },
    /*
      navbars example config strings:
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

    // Navbar Dots
    dotLabel: { // CICS TODO FEATURE: set this up to accept a custom string that will interpret data (i.e. "Go to ${element} #${index}")
      type: String,
      default: `<svg width="10px" height="10px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg>`
    },
    dotTrigger: {
      type: String,
      default: 'click' // (click/mouseover/none) - none, in case the user wants to display the dots purely for a visual effect?
    },
    dotMagnifyOnHover: {
      type: Boolean,
      default: true
    },
    dotColors: {
      type: Array,
      default: () => ([]) // base/hover/active - leave unset to control colors via css overrides
    },

    // Navbar Prev/Next
    prevLabel: { // can be svg string, ascii string, imageUrl string
      type: String,
      default: '&#9664'
      //'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z"/></svg>'
      //'&#9664', '&laquo;'
    },
    nextLabel: { // can be svg string, ascii string, imageUrl string
      type: String,
      default: '&#9654'
      //'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"/></svg>'
      //'&#9654', '&raquo;'
    },
    prevNextTrigger: {
      type: String,
      default: 'click' // (click/mouseover)
    },
    prevNextColors: {
      type: Array,
      default: () => ([]) // default/hover/disabled - leave unset to control colors via css overrides
    },
    revealPrevNextOnHover: { // CICS TODO: this will override any settings related to 'sides' in the navbars setting, and force sides(inside)
      type: Boolean,
      default: false
    },

    // dimensions
    width: {
      type: [String, Number],
      default: 'auto'
    },
    minWidth: {
      type: [String, Number],
      default: 'auto'
    },
    maxWidth: {
      type: [String, Number],
      default: 'auto'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    minHeight: {
      type: [String, Number],
      default: 'auto'
    },
    maxHeight: {
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
      default: ''
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

    // slide content
    slides: {
      type: Array,
      default: () => ([])
    },

    // transitions
    transitionName: {
      type: String,
      default: 'fade'
    },
    transitionDirection: { // CICS NOTE: will only apply to some transitions, but would nice to have slide up vs. left vs. etc.
      type: String,
      default: ''
    },
    transitionOnInitialRender: {
      type: Boolean,
      default: true
    },

    // responsive

    // shadows -> none/sm/md/lg
    carouselShadow: {
      type: String,
      default: 'none'
    },
    carouselShadowInner: {
      type: String,
      default: 'none'
    },
    stageShadow: {
      type: String,
      default: 'none'
    },
    stageShadowInner: {
      type: String,
      default: 'none'
    },
    slideShadow: {
      type: String,
      default: 'none'
    },
    slideInnerShadow: {
      type: String,
      default: 'none'
    },

  }

}
