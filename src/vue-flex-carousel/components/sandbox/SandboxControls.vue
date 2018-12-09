<template>
  <div class="vue-flex-carousel__sandbox-controls">

    <div class="m-2 flex flex-col fixed pin-b pin-l p-2 bg-blue-lightest border border-blue-light rounded">
      <h3 class="mt-2 mb-3">User Actions</h3>

      <!-- TODO: create a mixin for grids!! -->
      <!-- TODO: change these buttons to use FlexButton -->

      <div class="overflow-x-hidden flex flex-col">

        <div class="flex -mx-1 mb-2">
          <div class="mx-1">
            <button :click="shuffle" class="btn btn-primary btn-sm">Shuffle Slides</button>
          </div>
        </div>

        <div class="flex -mx-1 mb-2">
          <div class="mx-1">
            <button :click="previous" class="btn btn-primary btn-sm">Prev Slide</button>
          </div>
          <div class="mx-1">
            <button :click="next" class="btn btn-primary btn-sm">Next Slide</button>
          </div>
        </div>

        <div class="flex -mx-1 mb-2">
          <div class="mx-1">
            <button :click="previous" class="btn btn-primary btn-sm">Prev Page</button>
          </div>
          <div class="mx-1">
            <button :click="next" class="btn btn-primary btn-sm">Next Page</button>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
// CICS TODO: could make this an index.js file and then importing would look cleaner (i.e. import Sandbox from './sandbox')
export default {

}
// container ideas:
  // action buttons,
  // event callback checkboxes with slide in alerts,
  // layout dropdown plus free-entry prop string,
  // props container,
  // slide content editor
</script>

<style lang="scss">
.vue-flex-carousel__sandbox-controls {
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
