<template>
  <div class="flex-carousel">

    <div class="rounded p-4 bg-grey-light">

      <div class="flex-carousel__stage">
        <transition name="fade" appear>
          <div class="flex-carousel__slide h-full w-full" v-for="slide in activeSlides" :key="slide">
            <img class="rounded" :src="activeSlide.bgImageUrl">
          </div>
        </transition>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: 'flex-carousel',

  props: {

  },

  components: {  },

  data() {
    return {
      show: true,
      currentIndex: 0,
      slides: [
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
          bgColor: '',
          bgImageUrl: "https://placeimg.com/640/480/nature/1",
          innerHtml: `<div>Hi!  I'm html content!</div>`,
          data: {}
        },
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conseq.',
          bgColor: '',
          bgImageUrl: "https://placeimg.com/640/480/nature/2",
          innerHtml: ``,
          data: {}
        },
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing e.',
          bgColor: '',
          bgImageUrl: "https://placeimg.com/640/480/nature/3",
          innerHtml: ``,
          data: {}
        }
      ]
    }
  },

  computed: {
    activeSlide() {
      return this.slides.find((slide, index) => index == this.currentIndex)
    },
    activeSlides() {
      return this.slides.filter((slide, index) => index == this.currentIndex)
    }
  },

  methods: {
    next: function() {
      this.currentIndex = this.currentIndex == this.slides.length - 1 ? 0 : this.currentIndex + 1;
    },
    previous: function() {
      this.currentIndex = this.currentIndex == 0 ? this.slides.length - 1 : this.currentIndex - 1;
    },
  },

  mounted() {

  },

  created() {

  }
}
</script>

<style lang="scss" scoped>
.flex-carousel {

  &__stage {

  }

  &__slide {


    img {
      display: block;
    }
  }

}

// TRANSITIONS
.fade-enter-active, .fade-leave-active {
  transition: opacity 500ms ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.bounce-enter-active {
  animation: bounce-in .4s;
}
.bounce-leave-active {
  animation: bounce-in .4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
