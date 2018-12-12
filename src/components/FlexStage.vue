<template>
  <div :class="[htmlBlock, cssModifiers]">

    <!-- stage -->
    <transition-group name="fade" tag="ul" class="list-reset flex z-0" appear>
      <li v-for="(slide, index) in slides" :key="slide.src">
        <flex-slide :data="slide" :index="index" class="" v-show="slide.src == activeSlide.src"/>
      </li>
    </transition-group>

    <!-- <transition :name="carousel.transitionName" appear>
      <flex-slide
        :data="activeSlide"
      />
    </transition> -->

    <!-- stage inner shadow -->
    <div v-if="carousel.stageInnerShadow !== 'none'"
      :class="['stage__shadow-inner', {
        'shadow-inner-md': carousel.stageInnerShadow == 'md',
        'shadow-inner-lg': carousel.stageInnerShadow == 'lg'
      }]">
    </div>

  </div>
</template>

<script>
import flexCarousel from '../mixins/flexCarousel'
import FlexSlide from './FlexSlide'

export default {
  name: 'flex-stage',

  mixins: [flexCarousel],

  props: {

  },

  components: { FlexSlide },

  computed: {
    getters() {
      return this.store.getters
    },
    activeSlide() {
      return this.getters('activeSlide')
    },
    slides() {
      return this.carousel.slides
    },
    cssModifiers() {
      return []
    }
  },

  methods: {

  },

  mounted() {

  },

  created() {

  }
}
</script>

<style lang="scss" scoped>
.flex-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;

// for framed theme
// border border-grey-dark

  &--shadow-sm {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
  }
  &--shadow-md {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08);
  }
  &--shadow-lg {
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
  }

  &--shadow-inner-sm {
    box-shadow: inset 0 0 6px -2px rgba(0,0,0,0.5);
  }
  &--shadow-inner-md {
    box-shadow: inset 0 0 25px -6px rgba(0,0,0,0.5);
  }
  &--shadow-inner-lg {
    box-shadow: inset 0 0 50px -10px rgba(0,0,0,0.5);
  }
}
</style>
