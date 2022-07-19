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
  import { rootpath } from '../client.config'

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

  const isTouch = () => {
    if ((navigator as any).msPointerEnabled) {
      return true
    } else {
      if ('ontouchstart' in window) {
        return true
      }
      if ('onmousedown' in window) {
        return false
      }
    }
  }

  const onScroll = () => {
    info.setScroll(getWindowScroll())
  }
  // const throttlescroll = throttle((() => {
  //   onscroll()
  // }), 100)
  // const debouncescroll = debounce((() => {
  //   onscroll()
  // }), 200)
  const handlescroll = () => {
    // throttlescroll()
    // debouncescroll()
    onScroll()
  }

  const onResize = () => {
    info.setSize(getWindowSize())
    info.setScroll(getWindowScroll())
  }
  // const throttleresize = throttle((() => {
  //   onresize()
  // }), 100)
  // const debounceresize = debounce((() => {
  //   onresize()
  // }), 200)
  const handleresize = () => {
    // throttleresize()
    // debounceresize()
    onResize()
  }

  onMount(async () => {
    console.log(`env: ${process.env.SAPPER_APP_ENV}`)
    console.log(`api: ${process.env.SAPPER_APP_TEST_API}`)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${rootpath}/service-worker.js`)
      // navigator.serviceWorker.ready.then((registration) => {
      //   console.log(registration)
      // })
    }

    const html = document.documentElement
    if (isTouch()) {
      html.classList.add('device-use-touch')
    } else {
      html.classList.add('device-use-mouse')
    }

    let pathname = window.location.pathname

    onScroll()
    onResize()
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
  svelte:window(on:scroll!="{handlescroll}" on:resize!="{handleresize}")

  div#test
    p
      | width: {$info.size.width}
      | height: {$info.size.height}
    p
      | scrollY: {$info.scroll.y}
      | scrollX: {$info.scroll.x}
    p
      | segment: {segment}
    p
      | env: {process.env.SAPPER_APP_ENV}
      | api: {process.env.SAPPER_APP_TEST_API}

  Header({segment})

  PageTransitions(refresh!="{segment}")
    slot

  Footer
</template>
