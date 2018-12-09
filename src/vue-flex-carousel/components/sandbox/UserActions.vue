<template>
  <div class="flex flex-col p-2 bg-blue-lightest border border-blue-light rounded">
    <h3>User Actions</h3>

    <!-- TODO: create a mixin for grids!! -->
    <!-- TODO: change these buttons to use FlexButton -->

    <div class="overflow-x-hidden flex flex-col">

      <div class="flex flex-col -mx-1 mb-2">
        <div class="mx-1">
          <button :click="shuffle" class="btn btn-primary btn-sm w-full">Shuffle Slides</button>
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
</template>

<script>
export default {
}
</script>
