<script context="module" lang="ts">
  /* export const preload = async ({ path }) => ({ props: { refresh: path } }) */
</script>

<script lang="ts">
  import PageTransitions from '../components/atoms/PageTransitions.svelte'
  import Header from '../components/organisms/Header.svelte'
  import Footer from '../components/organisms/Footer.svelte'

  import { onMount } from 'svelte'

  import { stores, pageSegment } from '@sapper/app'
  const { page } = stores()

  import { state as info } from '../store/info'

  export let segment: string

  info.reset()

  const getWindowSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const getWindowScroll = () => {
    return {
      x: window.scrollX,
      y: window.scrollY
    }
  }

  onMount(async () => {
    let pathname = window.location.pathname
    info.setSize(getWindowSize())
    info.setScroll(getWindowScroll())

    window.addEventListener('resize', (e: Event) => {
      info.setSize(getWindowSize())
      info.setScroll(getWindowScroll())
    }, false)

    window.addEventListener('scroll', (e: Event) => {
      info.setScroll(getWindowScroll())
    }, false)
  })

  // console.log($page, 'test', pageSegment)
  // $: pagePath = $page.path.replace(/\//g, '')
</script>

<style lang="stylus" global>
  @import "../styles/style.styl"

  main
    min-height 600px
</style>

<template lang="pug">
  | width: {$info.size.width}
  | height: {$info.size.height}
  | scrollY: {$info.scroll.y}
  | scrollX: {$info.scroll.x}
  | segment {segment}
  //- | $page.path {$page.path}
  //- | pagePath {pagePath}
  //- | { previous }

  Header({segment})

  PageTransitions(refresh!="{segment}")
    slot

  Footer
</template>
