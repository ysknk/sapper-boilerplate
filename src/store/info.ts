import { writable } from 'svelte/store'
import * as store from './index'

const initialState = store.initialState.info

const createStore = () => {
  const { subscribe, set, update } = writable(initialState)
  let state
  subscribe((v) => {
    state = v
  })

  return {
    subscribe,
    set,
    update,

    reset: () => {
      set(initialState)
    },

    setSize: (size) => {
      update((state) => {
        return { ...state, size }
      })
    },

    setScroll: (scroll) => {
      update((state) => {
        return { ...state, scroll }
      })
    }
  }
}

export const state = createStore()
