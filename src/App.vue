<script setup lang="ts">
import { WebsocketBuilder } from 'websocket-ts'
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
new WebsocketBuilder('ws://bearhunt-games-api.herokuapp.com')
  .onOpen((i, ev) => {
    app.setServerTime('Connected!')
    i.send(JSON.stringify({ msg: 'hello world' }))
  })
  // .onClose((i, ev) => { console.log('closed') })
  .onError((i, ev) => { app.setServerTime('Can\'t connect to server!') })
  .onMessage(async(i, ev) => {
    const data = JSON.parse(await ev.data.text())
    if (data.serverTime)
      app.setServerTime(data.serverTime)
  })
  // .onRetry((i, ev) => { console.log('retry') })
  .build()
</script>

<template>
  <small class="text-white px-2">
    Server time: {{ app.serverTime }}
  </small>
  <router-view />
</template>
