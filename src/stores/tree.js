import { defineStore } from 'pinia'

export const useTreeStore = defineStore('addWidth', {
  state: () => {
    return { width: 0 }
  },
})
