type User = {
    name?: string
    email?: string
}

export const userStore = defineStore('USER', {
    state: () => ({
        user: {}
    }),
    persist: { storage: persistedState.localStorage },
    actions: {
        setUser(user: User) {
            const store = this
            store.user = user
        }
    },
    getters: {
        getUser: (state): User => state.user,
    }
})