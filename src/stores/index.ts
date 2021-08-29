import { acceptHMRUpdate, defineStore } from 'pinia'
import dayjs from 'dayjs'

export const appStore = defineStore('app', () => {
  const serverTime = ref('...')

  function setServerTime(time: string) {
    const date = dayjs(time)
    serverTime.value = date.format('HH:mm:ss dddd MMMM D, YYYY')
  }

  return {
    setServerTime,
    serverTime,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot))
