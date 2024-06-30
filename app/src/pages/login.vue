<script setup lang="ts">
import AuthCard from '~/components/auth-components/auth-card.vue'
import LoadingButton from '~/components/buttons/loading-button.vue'
import AuthTextInput from '~/components/auth-components/auth-text-input.vue'
import AuthPassInput from '~/components/auth-components/auth-pass-input.vue'
import { apiHandler, HttpMethod } from '~/helpers'
import { authStore } from '~/store/auth-store.ts'
import { userStore } from '~/store'
import type { LoginResponse } from '~/models'

definePageMeta({ middleware: ['public'] })

const loading = ref(false)
const keepConnected = ref(false)
const email = ref('')
const password = ref('')
const valid = ref<boolean>(false)
const formRules = {
  email: [
    (v: any) => !!v || 'Campo obrigatório',
    (v: any) => /^\w+([.-]?\w+)+([\w+])*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  ],
  password: [(v: any) => !!v || 'Campo obrigatório'],
}

async function onSubmit() {
  loading.value = true
  const response = await apiHandler({
    url: 'api/auth/sign-in',
    method: HttpMethod.POST,
    body: { email: email.value, password: password.value },
  })

  if (response) {
    const payload = Object.assign({}, response as LoginResponse, { keepConnected: keepConnected.value })
    authStore().setTokens(payload)

    if (payload.user) {
      userStore().setUser(payload.user)
      await navigateTo('/panel')
    }
  }
  loading.value = false
}

</script>
<template>
  <NuxtLayout name="auth-layout">
    <v-form @submit.prevent="onSubmit()" validate-on="submit" v-model="valid">
      <auth-card title="Entrar">
        <template #content>
          <auth-text-input label="E-mail" :rules="formRules.email" type="email" v-model="email" />
          <auth-pass-input label="Senha" :rules="formRules.password" v-model="password" />
        </template>
        <v-checkbox label="Manter Conectado" class="ml-2" hide-details="auto" v-model="keepConnected" />
        <template #actions>
          <loading-button append-icon="mdi:mdi-login" label="Entrar" :loading="loading" type="submit" />
        </template>
        <div class="tw-w-full tw-flex tw-justify-center tw-py-2 tw-underline tw-text-blue-500">
          <NuxtLink to="/sign-up">Criar Conta</NuxtLink>
        </div>
      </auth-card>
    </v-form>
  </NuxtLayout>
</template>

