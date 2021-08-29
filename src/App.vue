<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { appStore } from '~/stores/index'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Bearhunt Games',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})

const app = appStore()
const connection = new WebSocket('ws://bearhunt-games-api.herokuapp.com')
connection.onopen = function(event) {
  app.setServerTime('Connected!')
  connection.send(app.encodeWebsocketMessage({ msg: 'Hi server!' }))
}

connection.onmessage = async function(message) {
  if (message.data) {
    const data = await app.decodeWebsocketMessage(message.data)

    if (data.serverTime)
      app.setServerTime(data.serverTime)
  }
}
</script>

<template>
  <small class="text-white px-2">
    Server time: {{ app.serverTime }}
  </small>
  <router-view />
</template>
