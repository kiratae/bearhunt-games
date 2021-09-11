import axios from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'

import NProgress from 'nprogress'

export const useApiStore = defineStore('api', () => {
  const instance = ref(axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://bearhunt-games-api.herokuapp.com',
  }))

  const isLoading = ref(false)

  function getInstance() {
    return instance.value
  }

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  watchEffect(() => {
    if (isLoading.value)
      NProgress.start()
    else
      NProgress.done()
  })

  return {
    getInstance,
    setLoading,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useApiStore, import.meta.hot))
