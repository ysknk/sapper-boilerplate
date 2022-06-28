import { writable } from 'svelte/store'
import * as store from './index'

const initialState = store.initialState.info

const createStore = () => {
  const { subscribe, set, update } = writable(initialState)

  return {
    subscribe,
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