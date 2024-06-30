import { LoginResponse } from '~/models'

type Auth = {
  access_token?: string | null
  refresh_token?: string | null
  keepConnected?: boolean
}

export const authStore = defineStore('AUTH', {
  state: () => ({
    auth: {
      access_token: null,
      refresh_token: null,
      keepConnected: false,
    } as Auth,
  }),
  persist: { storage: persistedState.localStorage },
  actions: {
    setTokens({ access_token, refresh_token, keepConnected }: LoginResponse & { keepConnected: boolean }) {
      const store = this
      store.auth = {}
      store.auth.access_token = access_token
      if (keepConnected) {
        store.auth.keepConnected = keepConnected
        store.auth.refresh_token = refresh_token
      }
    },
  },
  getters: {
    getAccessToken: (state) => state.auth.access_token,
    getRefreshToken: (state) => state.auth.refresh_token,
    getKeepConnected: (state) => state.auth.keepConnected,
  },
})