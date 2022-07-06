<script lang="ts">
  import Image from 'svelte-image'

  export let width: number = null
  export let height: number = null
  export let src: string = ''
  export let alt: string = ''

  $: ratio = `${((height / width) * 100) || 100}%`
</script>

<style lang="stylus">
  @import '../../styles/config'

  .c-image
    relative top 0 left 0
    height 0
    :global(.wrapper)
      min-height 0 !important
    :global(img.main)
      height 100%

    &__inner
      absolute top 0 left 0
      display block
      width 100%
      height 100%
</style>

<template lang="pug">
  span.c-image(style!="padding-top:{ratio};")
    span.c-image__inner
      Image(src="{src}" ratio="{ratio}" width="{width}" height="{height}" alt="{alt}")
</template>
