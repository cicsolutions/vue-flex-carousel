<template>
  <div class="vfcarousel__stage border border-grey-dark">


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
      :class="['vfcarousel__shadow-inner', {
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
    // activeSlides() {
    //   return
    // },
    // activePage() {
    //
    // }
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
.vfcarousel {

  &__stage {
    @apply .relative;
    z-index: 0;
  }

  &__shadow-inner {
    @apply .shadow-inner;
  }

}
</style>
