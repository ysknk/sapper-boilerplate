<script context="module">
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  })
</script>

<script lang="ts">
  import PageTransitions from '../components/atoms/PageTransitions.svelte'
  import Header from '../components/organisms/Header.svelte'
  import Footer from '../components/organisms/Footer.svelte'

  export let segment: string
</script>

<style lang="stylus" global>
  @import "../styles/style.styl"

  main
    min-height 600px
</style>

<template lang="pug">
  Header({segment})

  PageTransitions(refresh!="{segment}")
    slot

  Footer
</template>
