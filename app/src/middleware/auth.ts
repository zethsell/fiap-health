import {authStore, userStore} from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
    if (authStore().getAccessToken === undefined) {
        authStore().$reset()
        userStore().$reset()
        return navigateTo('/login')
    }
});