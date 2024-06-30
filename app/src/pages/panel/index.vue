<script setup lang="ts">
import { authStore, userStore } from '~/store'
import { apiHandler, HttpMethod } from '~/helpers'

definePageMeta({ middleware: ['auth'] })

async function logout() {
  await apiHandler({
    url: '/api/auth/sign-out',
    method: HttpMethod.POST,
    auth: true,
  })
  userStore().$reset()
  authStore().$reset()
  await navigateTo({ name: 'login' })
}
</script>

<template>
  <NuxtLayout name="panel-layout">
    <h2>Index</h2>
  </NuxtLayout>
</template>

