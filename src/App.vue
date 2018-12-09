<template>
  <div id="app">
    <div class="flex justify-between items-center p-3 bg-grey-lighter shadow border-b fixed w-full">
      <img alt="Vue logo" src="./assets/logo.png" class="w-full" style="max-width: 50px;">
      <h1 class="">Vue Flex Carousel Sandbox</h1>
      <img alt="Vue logo" src="./assets/logo.png" class="w-full invisible" style="max-width: 50px;">
    </div>

    <div class="h-full flex items-center justify-center">
      <flex-carousel></flex-carousel>
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
  }
}
</script>
