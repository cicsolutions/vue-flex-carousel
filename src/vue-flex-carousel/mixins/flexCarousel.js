import Vue from 'vue'
// import defaultConfig from './carouselProps' // CICS NOTE: could just pull this in for the computed below, if we end up needing it!
import store from '../store'

export default {
  data: () => ({ store }),
  computed: {
    carousel() {
      return this.store.state
    },
    // NOTE: needed a way to get props that have been changed by the user (i.e. not with the default value)
    // So this is what you get!  Having defaultConfig as const allows us to retrieve the original obj and default values
    // userConfig() {
    //   return (element, modifier, excluded_value = null) => {
    //
    //     const capModifier = modifier.capitalize(),
    //       userConfig = {}
    //
    //       Object.keys(this.carousel).forEach((key) => {
    //         if (key.includes(`${element}${capModifier}`)
    //           && defaultConfig.hasOwnProperty(key))
    //         {
    //           let excluded = excluded_value || defaultConfig[key].default
    //           if (this.carousel[key] !== excluded) {
    //             userConfig[key] = this.carousel[key]
    //           }
    //         }
    //       })
    //
    //     return userConfig
    //   }
    // }
  },
  // methods: {
  //   capitalize: (string) => string.charAt(0).toUpperCase() + string.slice(1)
  // }
}

// CICS NOTE: we could add to the Vue prototype to have a more-global projection of our component
// but currently that seems unnecessary
// const flexCarousel = {}
// Vue.prototype.$flexCarousel = flexCarousel

// Vue.filter('capitalize', (value) => {
//   if (!value) return ''
//   value = value.toString()
//   return value.charAt(0).toUpperCase() + value.slice(1)
// })

// CICS TODO: find the best place to put this that isn't polluting the global namespace :)
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
