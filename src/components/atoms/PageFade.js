import { sineOut } from 'svelte/easing'

const duration = 250
const delay = duration

const delay0 = 0

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

