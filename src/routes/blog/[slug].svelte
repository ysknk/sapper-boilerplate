<script context="module" lang="ts">
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script lang="ts">
  import { fadeIn, fadeOut } from '../../components/atoms/PageFade'
  export let post: { slug: string; title: string, html: any };
</script>

<style lang="stylus">
  /*
    By default, CSS is locally scoped to the component,
    and any unused styles are dead-code-eliminated.
    In this page, Svelte can't know which elements are
    going to appear inside the {{{post.html}}} block,
    so we have to use the :global(...) modifier to target
    all elements inside .content
  */
  .content :global(h2)
    font-size 1.4em
    font-weight 500

  .content :global(pre)
    background-color #f9f9f9
    box-shadow inset 1px 1px 5px rgba(0, 0, 0, 0.05)
    padding 0.5em
    border-radius 2px
    overflow-x auto

  .content :global(pre) :global(code)
    background-color transparent
    padding 0

  .content :global(ul)
    line-height 1.5

  .content :global(li)
    margin 0 0 0.5em 0
</style>

<template lang="pug">
  svelte:head
    title {post.title}

  | {#key post.slug}
  div(class="wrapper" in:fadeIn out:fadeOut)
    h1 {post.title}

    div(class="content")
      | {@html post.html}
  | {/key}
</template>
