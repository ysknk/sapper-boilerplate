<script lang="ts">
  import successkid from 'images/successkid.jpg'
  import Image from '../components/atoms/Image.svelte'
  import SEO from '../components/atoms/SEO.svelte'
</script>

<style lang="stylus">
  h1,
  figure,
  p
    text-align center
    margin 0 auto

  h1
    font-size 2.8em
    text-transform uppercase
    font-weight 700
    margin 0 0 0.5em 0

  figure
    margin 0 0 1em 0

  img
    width 100%
    max-width 400px
    margin 0 0 1em 0

  p
    margin 1em auto

  @media (min-width: 480px)
    h1
      font-size 4em
</style>

<template lang="pug">
  SEO(title="Sapper project template")

  h1
    | Great success!

  figure
    img(alt="Success Kid" src="{successkid}")
    figcaption
      | Have fun with Sapper!

  hr

  p svelte-image
  //- p: Image(src="/images/successkid.jpg")
  p: Image(src="images/successkid.jpg" width="686" height="456")
</template>
