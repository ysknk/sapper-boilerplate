<script lang="ts">
  import Nav from '../molecules/Nav.svelte'

  export let segment: string
</script>

<style lang="stylus">
  @import '../../styles/config'
  .l-header
    center_margin()
</style>

<template lang="pug">
  header.l-header
    h1 header
    Nav({segment})
</template>
