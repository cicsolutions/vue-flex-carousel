<template>
  <div class="flex flex-col p-2 bg-blue-lightest border border-blue-light rounded">
    <h3>Actions</h3>

    <!-- TODO: create a mixin for grids!! -->

    <div class="overflow-x-hidden flex flex-col">

      <div class="flex flex-col -mx-1 mb-2">
        <div class="mx-1">
          <flex-button action="shuffle" class="btn btn-primary btn-sm w-full">Shuffle Slides</flex-button>
        </div>
      </div>

      <div class="flex -mx-1 mb-2">
        <div class="mx-1">
          <flex-button action="go-prev-slide" class="btn btn-primary btn-sm w-full">Prev Slide</flex-button>
        </div>
        <div class="mx-1">
          <flex-button action="go-next-slide" class="btn btn-primary btn-sm w-full">Next Slide</flex-button>
        </div>
      </div>

      <div class="flex -mx-1 mb-2">
        <div class="mx-1">
          <flex-button action="go-prev-page" class="btn btn-primary btn-sm w-full">Prev Page</flex-button>
        </div>
        <div class="mx-1">
          <flex-button action="go-next-page" class="btn btn-primary btn-sm w-full">Next Page</flex-button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import FlexButton from '../FlexButton'

export default {
  name: 'sadbox-user-actions',
  components: { FlexButton }
}
</script>
