import { Buffer } from 'buffer'
import { acceptHMRUpdate, defineStore } from 'pinia'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/en' // import locale
import 'dayjs/locale/th' // import locale
dayjs.extend(localizedFormat)

export const useAppStore = defineStore('app', () => {
  const appTime = ref('...')
  const serverTime = ref('...')
  const dayjsLocale = ref('en')
  const enc = new TextEncoder()

  function setServerTime(time: string) {
    appTime.value = time
    const date = dayjs(time)
    if (date.isValid())
      serverTime.value = date.locale(dayjsLocale.value).format('LL LTS')
    else
      serverTime.value = time
  }

  function encodeWebsocketMessage(data: object) {
    return enc.encode(JSON.stringify(data))
  }

  function setDayjsLocale(locale: string) {
    dayjsLocale.value = locale
    setServerTime(appTime.value)
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
    setDayjsLocale,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
