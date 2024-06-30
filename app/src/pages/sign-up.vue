<script setup lang="ts">
import AuthCard from '~/components/auth-components/auth-card.vue'
import LoadingButton from '~/components/buttons/loading-button.vue'
import AuthTextInput from '~/components/auth-components/auth-text-input.vue'
import AuthPassInput from '~/components/auth-components/auth-pass-input.vue'
import { apiHandler, HttpMethod, swalSuccess } from '~/helpers'

definePageMeta({ middleware: ['public'] })

const loading = ref(false)
const keepConnected = ref(false)
const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const valid = ref<boolean>(false)
const formRules = {
  name: [(v: any) => !!v || 'Campo obrigatório'],
  surname: [(v: any) => !!v || 'Campo obrigatório'],
  email: [
    (v: any) => !!v || 'Campo obrigatório',
    (v: any) => /^\w+([.-]?\w+)+([\w+])*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  ],
  password: [
    (v: any) => !!v || 'Campo obrigatório',
    (v: any) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v) || 'Senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número, um simbolo e no minimo 8 caracteres!',
    (v: any) => v === passwordConfirmation.value,
  ],
  passwordConfirmation: [
    (v: any) => !!v || 'Campo obrigatório',
    (v: any) => v === password.value || 'As senhas não coincidem',
  ],
}

async function onSubmit() {
  if (!valid.value) {
    return
  }

  loading.value = true
  const response = await apiHandler({
    url: 'api/auth/sign-up',
    method: HttpMethod.POST,
    body: {
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    },
  })

  if (response.statusCode === 204) {
    await swalSuccess({ message: 'Registro realizado com sucesso!' })
    await cancel()
  }

  loading.value = false
}

async function cancel() {
  await navigateTo('/login')
}

</script>
<template>
  <NuxtLayout name="auth-layout">
    <v-form @submit.prevent="onSubmit()" validate-on="submit" v-model="valid">
      <auth-card title="Cadastrar-se">
        <template #content>
          <auth-text-input label="Nome" :rules="formRules.name" type="text" v-model="name" />
          <auth-text-input label="Sobrenome" :rules="formRules.surname" type="text" v-model="surname" />
          <auth-text-input label="E-mail" :rules="formRules.email" type="email" v-model="email" />
          <auth-pass-input label="Senha" :rules="formRules.password" v-model="password" />
          <auth-pass-input label="Confirmar Senha" :rules="formRules.passwordConfirmation"
                           v-model="passwordConfirmation" />
        </template>
        <template #actions>
          <loading-button label="Cadastrar" :loading="loading" type="submit" />
          <loading-button label="Cancelar" :loading="loading" type="button" @click="cancel()" />
        </template>
      </auth-card>
    </v-form>
  </NuxtLayout>
</template>

