import Vue from "vue";
import { bus, events } from '../event-bus'

// state
const state = {
  carouselReady: false,
  slides: [],
  // pagesCount: 0,
  // slidesCount: 0,
  currentPageIndex: 0,
  currentSlideIndex: 0,
  hasSlottedSlides: false,
}

// getters
const getters = {
  pagesCount:  ({ state }) => Math.ceil(state.slidesCount / state.slidesPerPage),
  slidesCount:  ({ state }) => state.slides.length,
  previous: ({ state, getters }) => {
    let currentIndex = state[`current${state.scrollElement}Index`],
      lastIndex = state.slidesCount - 1

    if (currentIndex == 0) {
      return (state.loop) ? lastIndex : false
    } else {
      return currentIndex - 1
    }
  },
  next: ({ state, getters }) => {
    let currentIndex = state[`current${state.scrollElement}Index`],
      lastIndex = getters('slidesCount') - 1 // CICS TODO: this needs to consider slide vs. page and the scroll element

    if (currentIndex == lastIndex) {
      return (state.loop) ? 0 : false
    } else {
      return currentIndex + 1
    }

    return nextIndex
  },
  moveOffset: ({ state, getters }, newIndex) => {
    // calculate the offset to move dynamically by the scrollElement and slideCount?
    // then multiply by the change in index?
    let moveOffset = 0;
    if (state.scrollElement == 'Page') {
      moveOffset = state.stage.offsetWidth
    }
  }
}

// mutations
export const mutations = {
  setProp: (state, prop) => Vue.set(state, prop.key, prop.value),
  setSlides: (state, slides) => state.slides = slides,
  setCarouselReady: (state, value) => state.carouselReady = value,
  setScrollElement: (state, value) => state.scrollElement = value,
  setHasSlottedSlides: (state, value) => state.hasSlottedSlides = value,
  setCurrentIndex: (state, index) => state[`current${state.scrollElement}Index`] = index,
}

// actions
const actions = {
  init: async ({ dispatch, commit, state }, carousel) => {

      // save carousel props to store
      for (var key in carousel.$props) {
        commit('setProp', { key, value: carousel.$props[key] })
      }

      // assess slides
      if (carousel.$props.slides.length) {
        // save slides passed as prop object to the store
        commit('setSlides', carousel.$props.slides)
        // commit('setSlidesCount', state.slides.length)
      } else {

        if (!carousel.$slots.default) {
            throw new SyntaxError('Vue-Carousel Error: No <slide> elements found inside <carousel>.')
        }

        // filter out elements with tag: undefined from the carousel default slot
        let slides = carousel.$slots.default.filter((elm) => elm.tag)

        // make sure each element in the default slot is a carousel-slide
        if (!slides.every((elm) => elm.tag.includes('carousel-slide'))) {
            throw new SyntaxError('Vue-Carousel Error: Direct descendants of <carousel> element must be <slide> elements.')
        }

        // save slide count to store
        commit('setSlidesCount', slides.length)
      }

      // CICS TODO: need to check the value of the passed go-to prop and set the current index to said value :)
      // set the starting slide based on the passed props
      // let starting_slide = state.goToSlide

      // emit callback for onCarouselReady
      bus.$emit(events.callbacks.onCarouselReady, {
        slidesCount: state.slidesCount
      })

      // commit carouselReady
      commit('setCarouselReady', true)

      // CICS NOTE: can get the offsetWidth and offsetHeight of the stage to capture the dimensions!
  },
  // goToPrevious: ({ state, getters, commit }) => {
  //   let previous = getters('previous')
  //   if (previous !== false) {
  //     bus.$emit(events.callbacks.onGoToPrevious, { slideIndex: previous })
  //     commit('setCurrentIndex', previous)
  //   }
  // },
  // goToNext: ({ state, getters, commit }) => {
  //   let next = getters('next')
  //   if (next !== false) {
  //     bus.$emit(events.callbacks.onGoToNext, { slideIndex: next })
  //     commit('setCurrentIndex', next)
  //   }
  // },
  // goTo: ({ state, commit }, index) => {
  //   let currentIndex = state[`current${state.scrollElement}Index`]
  //   if (index != currentIndex) {
  //     bus.$emit(events.callbacks.onGoTo, { slideIndex: index })
  //     commit('setCurrentIndex', index)
  //   }
  // }
}

const createStore = ({ state, getters, mutations, actions }) => new Vue({
  data () {
    return { state }
  },
  methods: {
    commit(mutationName, payload) {
      mutations[mutationName](this.state, payload)
    },
    getters(getterName, payload) {
      return getters[getterName]({ state: this.state, getters: this.getters }, payload)
    },
    dispatch(actionName, payload) {
      let store = { state: this.state, getters: this.getters, dispatch: this.dispatch, commit: this.commit }
      return actions[actionName](store, payload)
    },
  },
})

// CICS TODO: test the feasability of having the store be the export default - not really priority but would be best setup
export const store = createStore({
  state,
  getters,
  mutations,
  actions
})
