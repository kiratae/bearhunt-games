<script setup lang="ts">
import axios from 'axios'
import { User, useUserStore } from '~/stores/user'
import { useApiStore } from '~/stores/api'

const router = useRouter()
const user = useUserStore()
const api = useApiStore()
const { t } = useI18n()

const savedUser = ref<User>(user.getUser())

if (!savedUser)
  router.push('/')

const games = [
  { id: 'dixit', name: 'Dixit', detail: 'Dixit detail!', isCreating: false },
]

const createRoom = async(gameId: string) => {
  await api.getInstance().post('/rooms', {
    gameId,
    userId: savedUser.value.id,
  }).then((res) => {
    const data = res.data
    router.push(`/room/${data.id}`)
  })
}
const back = () => {
  sessionStorage.removeItem('user')
  router.back()
}

</script>

<template>
  <div>
    <p class="text-5xl">
      <fluent-person-20-regular class="inline-block" />
    </p>
    <p>{{ t('intro.hi', { name: savedUser?.name }) }}</p>

    <div v-if="games.length" class="my-3 w-4/6 sm:w-4/5 lg:w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(game, index) in games" :key="index" class="box col-auto">
        <div class="text-center space-y-2">
          <div class="space-y-0.5">
            <p class="text-lg text-black dark:text-white font-semibold mb-2">
              {{ game.name }}
            </p>
            <p class="text-gray-500 dark:text-gray-300 font-medium pb-3">
              {{ game.detail }}
            </p>
          </div>
          <!-- Create room -->
          <div class="inline">
            <button class="icon-btn create-room-btn text-center" :disabled="savedUser == null" @click="createRoom(game.id)">
              <cil-room class="inline align-text-bottom mr-1" /><span>Create Room</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button class="btn m-3 text-sm mt-6" @click="back()">
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>

<style>
.box {
  @apply p-4 m-3
    bg-white dark:bg-gray-400 dark:bg-opacity-10
    rounded-xl shadow-md space-y-2;
}
.create-room-btn {
  @apply px-4 py-1 w-full text-teal-600 font-semibold
    rounded-full border border-teal-200 dark:border-teal-800
    hover:text-white hover:bg-teal-600 hover:border-transparent
    focus:outline-none focus:ring-2 ring-teal-600 ring-opacity-40;
}
</style>
