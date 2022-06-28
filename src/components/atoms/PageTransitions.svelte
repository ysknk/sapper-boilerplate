<script lang="ts">
  /* import { fade } from 'svelte/transition' */
  import { sineOut } from 'svelte/easing'
  import { fadeIn, fadeOut } from './PageFade'

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
