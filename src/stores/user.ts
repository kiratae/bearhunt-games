import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */
  class User {
    id: string
    name: string

    constructor(id: string, name: string) {
      this.id = id
      this.name = name
    }
  }

  const savedUser = ref<User>()

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setUser(id: string, name: string) {
    savedUser.value = new User(id, name)
  }

  return {
    savedUser,
    setUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
