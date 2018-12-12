<template>
  <div id="app">
    <div class="flex justify-between items-center p-3 bg-grey-lighter shadow border-b fixed w-full">
      <img alt="Vue logo" src="./assets/logo.png" class="w-full" style="max-width: 50px;">
      <h1 class="">Vue Flex Carousel Sandbox</h1>
      <img alt="Vue logo" src="./assets/logo.png" class="w-full invisible" style="max-width: 50px;">
    </div>

    <div class="h-full flex items-center justify-center">
      <flex-carousel

        :slides="carouselSlides"
      >

      </flex-carousel>
    </div>

  </div>
</template>

<script>
import './assets/app.scss'
import { FlexCarousel } from './vue-flex-carousel'
export default {
  name: 'app',
  components: {
    FlexCarousel
  },
  computed: {
    carouselSlides() {
      return [
        {
          title: 'Slide #',
          caption: 'My amazing slide caption.',
          src: 'https://placeimg.com/640/480/nature', // CICS TODO: need a check to be sure slide data is accurate and available
          bgColor: '',
          bgImageUrl: '',
          innerHtml: '',
          order: null, // CICS TODO: need to decide how to handle values from user that are not accurate
          isVisible: true
        },
      ]
    }
  }
}
</script>
