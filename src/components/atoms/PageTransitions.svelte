<script lang="ts">
  /* import { fade } from 'svelte/transition' */
  import { sineOut } from 'svelte/easing'

  let duration: number = 250;
  let delay: number = duration;

  let delay0: number = 0;

  export const fadeIn = () => ({
    duration,
    delay,
    easing: sineOut,
    css: (t) => { return `opacity: ${t}` }
  })
  export const fadeOut = () => ({
    duration,
    delay: delay0,
    easing: sineOut,
    css: (t) => { return `opacity: ${t}` }
  })

  export let refresh = ''
</script>

<template lang="pug">
  | {#key refresh}
  //- div(
  //-   in:fade="{{ delay: 250, duration: 250 }}"
  //-   out:fade="{{ duration: 250 }}"
  //- )
  div(in:fadeIn out:fadeOut)
    slot
  | {/key}
</template>
