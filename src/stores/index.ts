import { Buffer } from 'buffer'
import { acceptHMRUpdate, defineStore } from 'pinia'
import dayjs from 'dayjs'

export const appStore = defineStore('app', () => {
  const serverTime = ref('...')
  const enc = new TextEncoder()

  function setServerTime(time: string) {
    const date = dayjs(time)
    if (date.isValid())
      serverTime.value = date.format('HH:mm:ss dddd MMMM D, YYYY')
    else
      serverTime.value = time
  }

  function encodeWebsocketMessage(data: object) {
    return enc.encode(JSON.stringify(data))
  }

  async function decodeWebsocketMessage(data: Blob) {
    try {
      const buffer = Buffer.from(await data.arrayBuffer())
      return JSON.parse(buffer.toString('utf8'))
    }
    catch (error) {
      return null
    }
  }

  return {
    setServerTime,
    serverTime,
    encodeWebsocketMessage,
    decodeWebsocketMessage,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot))
