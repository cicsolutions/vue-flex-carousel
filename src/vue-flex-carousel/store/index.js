import Vue from 'vue'
import { bus, events } from '../event-bus'

// state
const state = {
  carouselReady: false,
  slides: [],
  activePageIndex: 0,
  activeSlideIndex: 0
}

// getters
const getters = {
  slidesCount: (state) => state.slides.length,
  pagesCount: (state, getters) => Math.ceil(getters('slidesCount') / state.slidesPerPage),
  activeSlide: (state) => state.slides.find((slide, index) => index == state.activeSlideIndex),
  // activePage: ({ state }) => state.slides.find((slide, index) => index == state.activePageIndex),
  prev: (state, getters, element) => {
    let capElement = element.capitalize(),
      activeIndex = state[`active${capElement}Index`],
      lastIndex = getters(`${element}sCount`) - 1

    if (activeIndex == 0) {
      return (state.loop) ? lastIndex : false // NOTE: returning false if not looping
    } else {
      return activeIndex - 1
    }
  },
  next: (state, getters, element) => {
    let capElement = element.capitalize(),
      activeIndex = state[`active${capElement}Index`],
      lastIndex = getters(`${element}sCount`) - 1

    if (activeIndex == lastIndex) {
      return (state.loop) ? 0 : false // NOTE: returning false if not looping
    } else {
      return activeIndex + 1
    }
  }
  // moveOffset: ({ state, getters }, newIndex) => {
  //   // calculate the offset to move dynamically by the scrollElement and slideCount?
  //   // then multiply by the change in index?
  //   // let moveOffset = 0;
  //   // if (state.scrollElement == 'Page') {
  //   //   moveOffset = state.stage.offsetWidth
  //   // }
  //   return 0
  // }
}

// mutations
const mutations = {
  setProp: (state, prop) => Vue.set(state, prop.key, prop.value),
  appendSlides: (state, slides) => state.slides = [...state.slides, slides],
  setCarouselReady: (state, value) => state.carouselReady = value,
  setScrollElement: (state, value) => state.scrollElement = value,
  setActiveIndex: (state, { element, index }) => state[`active${element}Index`] = index // NOTE: element is already capitalized in go() action below
}

// actions
const actions = {
  init: async ({ getters, dispatch, commit }, carousel) => {

    // save carousel props to store & any slides that are passed via slides prop
    await dispatch('_saveProps', carousel.$props)

    // look for slides in default slot
    if (!carousel.$slots.default) {

      // throw error if there were no slides in the props either
      if (!getters('slidesCount')) {
        throw new SyntaxError('Vue-Flex-Carousel Error: No slide data found in slides property or <slide> elements inside <flex-carousel>.')
      }

    } else {

      // filter out elements with tag: undefined from the carousel default slot
      let slotSlides = carousel.$slots.default.filter((elm) => elm.tag)

      console.log(slotSlides)

      // make sure each root element in the default slot is a slide-input slide
      if (!slotSlides.every((elm) => elm.tag.includes('slide-input'))) {
        throw new SyntaxError('Vue-Flex-Carousel Error: Direct descendants of <flex-carousel> element must be <slide> elements.')
      } else {

        // slot slides look good!  Let's append them to the store
        commit('appendSlides', slotSlides)

      }
    }

    // CICS TODO: need to check the value of the passed go-to prop and set the current index to said value :)
    // set the starting slide based on the passed props
    // let starting_slide = state.goToSlide

    let reportData = {
      slidesCount: getters('slidesCount'),
      slidesPerPage: state.slidesPerPage,
      pagesCount: getters('pagesCount')
    }

    // emit callback for onCarouselReady
    bus.$emit(events.callbacks.onCarouselReady, reportData)

    return 'done'

  },

  _saveProps: async ({ state, getters, commit }, props) => {

    // NOTE: slide data can be passed as a prop
    // and if so, that slide data is being added to the store in this step

    // CICS TODO: need a good way to validate the slide data -- compare it against a mixin?

    // options #1 - may have issues in IE? Pollyfill that biotch!  // CICS TODO: IE testing :P
    Object.keys(props).forEach((key) => commit('setProp', { key, value: props[key] }))

    // option #2
    // for (var key in props) {
    //   if (!props.hasOwnProperty(key)) continue;
    //   commit('setProp', { key, value: props[key] })
    // }
  },

  go: ({ state, getters, commit }, { action, element, index }) => {
    let capAction = action.capitalize(),
      capElement = element.capitalize(),
      prevNext = getters(action, element), // NOTE: value will be false if not allowed to prev/next
      activeIndex = state[`active${capElement}Index`]

    if (index && index != activeIndex) { // NOTE: if true, we've been passed an index, thus goTo(element, index) is the callback to fire

      // going to the slide/page index passed - // CICS TODO: need a check here b/c we could be accepting a value passed by user

      let callbackName = `onGoTo${capElement}`,
        reportData = {
          action: capAction,
          element: capElement,
          index: index
        }

      // fire goTo callback
      bus.$emit(events.callbacks[callbackName], reportData)

      // update active index for the slide/page
      commit('setActiveIndex', reportData)

    } else {
      // CICS NOTE: Otherwise, we are prev/nexting, so goToPev/Next(element) would be the callback to fire

      if (prevNext !== false) { // if allowed to prev/next

        let callbackName = `onGo${capAction}${capElement}`,
          reportData = {
            action: capAction,
            element: capElement,
            index: prevNext
          }

        // fire goPrev or goNext callback
        bus.$emit(events.callbacks[callbackName], reportData)

        // update active index for the slide/page
        commit('setActiveIndex', reportData)

      }
    }
  }
}

const createStore = ({ state, getters, mutations, actions }) => new Vue({
  data: () => ({ state }),
  computed: {
    context() {
      return {
        state: this.state,
        commit: this.commit,
        getters: this.getters,
        dispatch: this.dispatch
      }
    }
  },
  methods: {
    commit(mutationName, payload) {
      mutations[mutationName](this.state, payload)
    },
    getters(getterName, payload) {
      return getters[getterName](this.state, this.getters, payload)
    },
    async dispatch(actionName, payload) {
      try {
        return await actions[actionName](this.context, payload)
      } catch(error) {
        console.log(error)
      }
    }
  }
})

const store = createStore({
  state,
  getters,
  mutations,
  actions
})

export default store
