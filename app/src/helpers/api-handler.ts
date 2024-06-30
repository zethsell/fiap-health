import { authStore, userStore } from '~/store'
import { swalError } from '~/helpers'

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

type ApiInput = {
  url: string
  method: HttpMethod
  body?: any
  auth?: boolean
}

export async function apiHandler<T = any | null>(
  {
    url,
    method = HttpMethod.GET,
    body = undefined,
    auth = false,
  }: ApiInput): Promise<T> {
  let result = null
  await $fetch(url, {
    method,
    body,
    headers: auth ? getHeaders() : {},
    async onResponse({ response, request }): Promise<void> {
      if (response.ok) {
        result = response._data
        result = Object.assign({}, result, { statusCode: response.status })
      }
    },
    async onResponseError({ response, request }): Promise<void> {
      const store = authStore()
      if (response.status === 401) {
        store.$reset()
        await navigateTo('/login')
        return
      }

      if (response.status === 500) {
        await swalError({ title: 'Erro de Servidor', message: 'Alguma coisa deu errado!' })
        return
      }


      if (response.status === 401 && !store.getAccessToken) {
        await swalError({ title: 'Unauthorized', message: 'Invalid credentials' })
        return
      }

      if (response.status === 401 && store.getAccessToken) {
        if (!store.getRefreshToken && !store.getKeepConnected) {
          await navigateTo('/login')
          return
        }

        await refreshSession()
        return
      }
    },
  })

  return result as any
}

function getHeaders() {
  return {
    Authorization: `Bearer ${authStore().getAccessToken}`,
  }
}

async function refreshSession() {
  await apiHandler({
    url: '/api/auth/refresh-token',
    body: {
      email: userStore().getUser.email,
      refresh_token: authStore().getRefreshToken,
    },
    method: HttpMethod.POST,
    auth: true,
  })
}