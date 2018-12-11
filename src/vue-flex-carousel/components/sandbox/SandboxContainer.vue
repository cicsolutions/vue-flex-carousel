<template>
  <div class="vue-flex-carousel__sandbox">

    <actions class="fixed pin-b pin-l m-2 max-w-xs"/>

    <div class="fixed pin-r pin-b flex flex-col m-2 max-w-xs">
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

export default {
  name: 'sandbox-container',
  components: { Actions, Effects, Events, Layouts, Modes }
}
</script>

<style lang="scss">
.vfcarousel__sandbox {
  @apply .absolute .pin-t .pin-r .pin-b .pin-l;

  h3 {
    @apply .mt-1 .mb-3;
  }
}
</style>
