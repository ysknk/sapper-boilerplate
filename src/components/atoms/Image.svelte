<script lang="ts">
  import Image from 'svelte-image'

  export let width: number = null
  export let height: number = null
  export let src: string = ''
  export let alt: string = ''

  $: ratio = `${((height / width) * 100) || 100}%`
</script>

<style lang="stylus">
  .c-img
    :global(img.main)
      height 100%
</style>

<template lang="pug">
  span.c-img
    Image(src="{src}" ratio="{ratio}" width="{width}" height="{height}" alt="{alt}")
</template>
