<script setup lang="ts">
import { useApiStore } from '~/stores/api'
import { useUserStore } from '~/stores/user'

const props = defineProps<{ id: string }>()
const { t } = useI18n()

const api = useApiStore()
const user = useUserStore()
const roomData = ref(null)

const getData = async() => await api.getInstance().get(`/rooms/${props.id}`).then((res) => {
  roomData.value = res.data
  if (user.savedUser.id != roomData.createUserId) {
    // TODO : Join this room
  }
})
getData()
</script>

<template>
  <p>RoomId: {{ props.id }}</p>

  <template v-if="roomData">
    <p>Game: {{ roomData.gameId }}</p>
    <p>{{ user.savedUser.id == roomData.createUserId ? 'you are room creator' : '-' }}</p>

    <p class="mt-3">
      In room playes:
    </p>
    <ul v-if="roomData.users && roomData.users.length">
      <li v-for="(user, index) of roomData.users" :key="index">
        {{ index }} - {{ user.name }}
      </li>
    </ul>
  </template>
</template>
