<template>
  <div>
    loader goes here!
  </div>
</template>

<script>
require('../utils/loadProgress')

export default {
  name: '',

  props: {

  },

  components: {  },

  data() {
      return {

      }
  },

  computed: {

  },

  methods: {

  },

  mounted() {

  },

  created() {

  }
}
// Large Image for load testing
// https://edmullen.net/test/rc.jpg
// http://blogs.adobe.com/webplatform/files/ImgProgressSample.html?file=ImgProgressSample.html


// var images = new Array()
// function preload() {
//   for (i = 0; i < preload.arguments.length; i++) {
//     images[i] = new Image()
//     images[i].src = preload.arguments[i]
//   }
// }
// preload(
//   "http://domain.tld/gallery/image-001.jpg",
//   "http://domain.tld/gallery/image-002.jpg",
//   "http://domain.tld/gallery/image-003.jpg"
// )
</script>

<style lang="css">
</style>
