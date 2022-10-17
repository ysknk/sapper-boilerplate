<script lang="ts">
  import * as config from '../../client.config'
  export let title:string = config.title
  export let description:string = config.description
  export let url = config.url
  export let canonical = url

  const baseOG = {
    title,
    description,
    image: `${url}images/common/og_image_1.png`,
    type: 'article',
    site_name: title
  }
  export let og = {}
  og = Object.assign({}, baseOG, og)

  const baseTwitter = {
    card: 'summary_large_image'
  }
  export let twitter = {}
  twitter = Object.assign({}, baseTwitter, twitter)
</script>

<style lang="stylus">
</style>

<template lang="pug">
  svelte:head
    title!="{title}"
    meta(name="canonical" content!="{canonical}")
    meta(name="description" content!="{description}")
    +each("Object.entries(og) as [key, value]")
      meta(property!="og:{key}" content!="{value}")
    +each("Object.entries(twitter) as [key, value]")
      meta(name!="twitter:{key}" content!="{value}")
</template>
