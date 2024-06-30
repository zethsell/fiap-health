import {authStore} from "~/store/auth-store.ts";

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.name === 'login' && authStore().getAccessToken) {
        return navigateTo('/panel/')
    }
});