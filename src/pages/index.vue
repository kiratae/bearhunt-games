<script setup lang="ts">
import { useAppStore } from '~/stores'
import { useApiStore } from '~/stores/api'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const app = useAppStore()
const user = useUserStore()
const api = useApiStore()
const name = ref(user.savedUser?.name)
let isLoading = false

const go = async() => {
  isLoading = true
  api.setLoading(isLoading)
  await api.getInstance().post('/users', {
    name: name.value,
  }).then((res) => {
    const data = res.data
    sessionStorage.setItem('user', JSON.stringify(data))
    user.setUser(data.id, data.name)
    if (app.returnUrl != '') {
      router.push(app.returnUrl)
      app.setReturnUrl('')
    }
    else {
      router.push('/room')
    }
  })
  isLoading = false
  api.setLoading(isLoading)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <p class="text-5xl">
      <emojione-monotone-bear-face class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://bearhunt-games.netlify.app" target="_blank">Bearhunt Games</a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button class="m-3 text-sm btn" :disabled="!name || isLoading" @click="go">
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
