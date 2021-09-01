<script setup lang="ts">
import axios from 'axios'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

const name = ref(user.savedUser?.name)

if (!name.value)
  router.push('/')

const games = [
  { id: 'dixit', name: 'Dixit', detail: 'Dixit detail!', isCreating: false },
]

const createRoom = async(gameId: string) => {
  // const data = await axios.post('localhost:3000/rooms', {
  //   gameId,
  // })
  // console.log(data)
  router.push('/room/123')
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
    <p>{{ t('intro.hi', { name: name }) }}</p>

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
            <button class="icon-btn create-room-btn text-center" @click="createRoom(game.id)">
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
