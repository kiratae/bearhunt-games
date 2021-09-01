<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useAppStore } from '~/stores/index'
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
const app = useAppStore()
const connection = new WebSocket('wss://bearhunt-games-api.herokuapp.com')
// const connection = new WebSocket('ws://localhost:3000')
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
  <router-view />
</template>
