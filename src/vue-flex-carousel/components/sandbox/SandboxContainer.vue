<template>
  <div class="carousel__sandbox">

    <div class="fixed pin-b pin-l m-2 max-w-xs">
      <actions/>
    </div>

    <div class="fixed pin-r pin-b flex flex-col m-2 max-w-xs">
      <presets class="mb-2"/>
      <modes class="mb-2"/>
      <layouts class="mb-2"/>
      <effects class="mb-2"/>
      <events/>
    </div>

  </div>
</template>

<script>

// CICS TODO: could make this an index.js file and then importing would look cleaner (i.e. import Sandbox from './sandbox')?

import Actions from './Actions'
import Effects from './Effects'
import Events from './Events'
import Layouts from './Layouts'
import Modes from './Modes'
import Presets from './Presets'

export default {
  name: 'sandbox-container',
  components: { Actions, Effects, Events, Layouts, Modes, Presets }
}
</script>

<style lang="scss">
.carousel__sandbox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;

  h3 {
    @apply .mt-1 .mb-3;
  }
}
</style>
