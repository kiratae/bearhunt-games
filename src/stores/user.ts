import { acceptHMRUpdate, defineStore } from 'pinia'

export class User {
  id: string
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}

export const useUserStore = defineStore('user', () => {
  /**
   * Current named of the user.
   */
  const savedUser = ref<User>()

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param id - new id to set
   * @param name - new name to set
   */
  function setUser(id: string, name: string) {
    savedUser.value = new User(id, name)
  }

  function getUser() {
    return savedUser.value
  }

  return {
    savedUser,
    setUser,
    getUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
