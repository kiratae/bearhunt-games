<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { appStore } from '~/stores/index'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Bearhunt Games',
  meta: [
    { name: 'description', content: 'Free online board game for everyone!' },
  ],
})

const { t } = useI18n()
const app = appStore()
const connection = new WebSocket('wss://bearhunt-games-api.herokuapp.com')
connection.onopen = function(event) {
  app.setServerTime('Connected!')
  connection.send(app.encodeWebsocketMessage({ msg: 'Hi server!' }))
}

connection.onmessage = async function(message) {
  try {
    if (message.data) {
      const data = await app.decodeWebsocketMessage(message.data)

      if (data.serverTime)
        app.setServerTime(data.serverTime)
    }
  }
  catch (error) {
    app.setServerTime('Error')
  }
}
</script>

<template>
  <p class="text-gray-700 dark:text-gray-200 px-1 opacity-75 text-sm">
    {{ t('server.server-time', { time: app.serverTime }) }}
  </p>
  <router-view />
</template>
