<script context="module" lang="ts">
  export function preload() {
    return this.fetch(`blog.json`).then((r: { json: () => any; }) => r.json()).then((posts: { slug: string; title: string, html: any }[]) => {
      return { posts };
    });
  }
</script>

<script lang="ts">
  export let posts: { slug: string; title: string, html: any }[];
</script>

<style lang="stylus">
  ul
    margin 0 0 1em 0
    line-height 1.5
</style>

<template lang="pug">
  svelte:head
    title Blog

  h1 Recent posts

  ul
    | {#each posts as post}
    // we're using the non-standard `rel=prefetch` attribute to tell Sapper to load the data for the page as soon as the user hovers over the link or taps it, instead of waiting for the 'click' event
    li: a(rel="prefetch" href="blog/{post.slug}") {post.title}
    | {/each}
</template>
