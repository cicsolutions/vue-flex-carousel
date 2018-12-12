<template>
  <div :class="[htmlBlock, cssModifiers]" :location="location" :position="position">
      <flex-button class="navbar__prev" action="go-prev-slide"/>
      <div class="navbar__dotnav">
        <flex-button action="go-to-slide" v-for="(dot, index) in pagesCount" :key="index" :index="index"/>
      </div>
      <flex-button class="navbar__next" action="go-next-slide"/>
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
    navbars() {
      return this.carousel.navbars
    },
    cssModifiers() {
      let classes = `${this.htmlBlock}--${this.location}-${this.position}`




      // CICS NOTE: can't use .some() here, will need to itterate the contexts to make sure we have an exact top or bottom match b/c user could configure top and bottom options
      // if (this.contexts.locations.some(context => this.navbars.includes(context))) {
      //   if (this.navbars.includes(`--left`)) {
      //     classes += '--left'
      //   }
      // } else if (this.contexts.locations.some(context => this.navbars.includes(context))) {
      //   if (this.navbars.includes(`--right`)) {
      //     classes += '--right'
      //   }
      // }

      return classes
    },
    hideArrows() { // faster to check when to hide b/c arrows shown by default with less-specific settings like 'top', 'bottom'
      return (this.contexts.dots.some(context => this.navbars.includes(context))
          && !this.contexts.arrows.some(context => this.navbars.includes(context)))
    },
    hideDots() { // faster to check when to hide b/c dots shown by default with less-specific settings like 'top', 'bottom'
      return (this.contexts.arrows.some(context => this.navbars.includes(context))
        && !this.contexts.dots.some(context => this.navbars.includes(context)))
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
.flex-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__dotnav {
  display: flex;
}

.flex-navbar {
  // location top
  &[location='top'], &[location='bottom'] {

    .navbar__dotnav {

    }
  }

  // position inside
  &[position="inside"] {
    position: absolute;
    z-index: 10;

    button {
      color: #fff;
    }
    svg {
      fill: currentColor;
    }

    &[location="top"] {
      width: 100%;
      top: 0;
      right: 0;
      left: 0;
    }
    &[location="right"] {
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
    }
    &[location="bottom"] {
      width: 100%;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &[location="left"] {
      height: 100%;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }

  &[location="left"], &[location="right"] {
    flex-direction: column;

    .navbar__dotnav {
      flex-direction: column;
    }
  }


  // location bottom
  // &[location='bottom'] {
  //
  // }
  //
  // // location left
  // &[location='left'] {
  //
  // }
  //
  // // location right
  // &[location='right'] {
  //
  // }

}
// .flex-navbar--top {
//
//   &-outside {
//
//     @apply .border .border-red;
//
//   }
//
//   &-inside {
//     width: 100%;
//     top: 0;
//     right: 0;
//     left: 0;
//     z-index: 10;
//
//     @apply .border .border-white .text-white;
//   }
// }
// .flex-navbar--bottom {
//   @apply .border .border-orange;
//
//   &-outside {
//
//     @apply .border .border-red;
//   }
//
//   &-inside {
//     width: 100%;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 10;
//
//
//     @apply .border .border-white .text-white;
//   }
// }
// .flex-navbar--left {
//   @apply .border .border-green;
//
//   &-outside {
//     flex-direction: column;
//
//     @apply .border .border-red;
//   }
//
//   &-inside {
//     height: 100%;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 10;
//
//     flex-direction: column;
//
//     @apply .border .border-white .text-white;
//   }
// }
// .flex-navbar--right {
//   @apply .border .border-blue;
//
//   &-outside {
//     flex-direction: column;
//
//     @apply .border .border-red;
//   }
//
//   &-inside {
//     height: 100%;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     z-index: 10;
//
//     flex-direction: column;
//
//     @apply .border .border-white .text-white;
//   }
// }





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
