<template>
  <div class="vue-flex-carousel__sandbox">

    <user-actions class="fixed pin-b pin-l m-2"></user-actions>

    <div class="fixed pin-r pin-b flex flex-col m-2">
      <layout-editor class="mb-2"></layout-editor>
      <carousel-events class=""></carousel-events>
    </div>

  </div>
</template>

<script>
// CICS TODO: could make this an index.js file and then importing would look cleaner (i.e. import Sandbox from './sandbox')?

import UserActions from './UserActions'
import LayoutEditor from './LayoutEditor'
import CarouselEvents from './CarouselEvents'

export default {
  name: 'sandbox-container',

  props: {

  },

  components: { UserActions, LayoutEditor, CarouselEvents },

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
// container ideas:
  // action buttons,
  // event callback checkboxes with slide in alerts,
  // layout dropdown plus free-entry prop string,
  // props container,
  // slide content editor
</script>

<style lang="scss">
.vue-flex-carousel__sandbox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  // .btn {
  //   width: 100%;
  // }

}
</style>
