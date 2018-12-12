<template>
  <div class="flex flex-col p-2 bg-teal-lightest border border-teal-light rounded">
    <h3>Navbars</h3>
    <div class="card__body">
      <select name="navbars" v-model="carousel.navbars">
        <option value="">-- None (empty string) --</option>
        <option value="top">top</option>
        <option value="bottom">bottom</option>
        <option value="left">left</option>
        <option value="right">right</option>
        <option value="sides">sides</option>

        <option value="top(inside)">top(inside)</option>
        <option value="bottom(inside)">bottom(inside)</option>
        <option value="left(inside)">left(inside)</option>
        <option value="right(inside)">right(inside)</option>
        <option value="sides(inside)">sides(inside)</option>

        <option value="top_bottom">top_bottom</option>
        <option value="left_right">left_right</option>

        <!-- Possible, but probably not too common -->
        <!-- <option value="top_left">top_left</option>
        <option value="top_right">top_right</option>
        <option value="bottom_left">bottom_left</option>
        <option value="bottom_right">bottom_right</option> -->

        <option value="top(inside)_bottom">top(inside)_bottom</option>
        <option value="top_bottom(inside)">top_bottom(inside)</option>
        <option value="left_right(inside)">left_right(inside)</option>
        <option value="left(inside)_right">left(inside)_right</option>

        <option value="top(inside)_bottom(inside)">top(inside)_bottom(inside)</option>
        <option value="left(inside)_right(inside)">left(inside)_right(inside)</option>

        <option value="top_left">top_left</option>
        <option value="top_right">top_right</option>
        <option value="bottom_left">bottom_left</option>
        <option value="bottom_right">bottom_right</option>

        <option value="top_left(inside)">top_left(inside)</option>
        <option value="top_right(inside)">top_right(inside)</option>
        <option value="bottom_left(inside)">bottom_left(inside)</option>
        <option value="bottom_right(inside)">bottom_right(inside)</option>

        <option value="top(inside)_left">top(inside)_left</option>
        <option value="top(inside)_right">top(inside)_right</option>
        <option value="bottom(inside)_left">bottom(inside)_left</option>
        <option value="bottom(inside)_right">bottom(inside)_right</option>

        <option value="top--start">top--start</option>
        <option value="top--end">top--end</option>
        <option value="top--center">top--center</option>
      </select>
    </div>
  </div>
</template>

<script>
import flexCarousel from '../../mixins/flexCarousel'

export default {
  name: 'sandbox-layout',

  mixins: [flexCarousel],

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
</script>

<style lang="css">
</style>
