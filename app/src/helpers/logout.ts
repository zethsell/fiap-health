import { authStore, userStore } from '~/store'

export async function logout() {
  // await apiHandler({
  //   url: '/api/auth/sign-out',
  //   method: HttpMethod.POST,
  //   auth: true,
  // })
  userStore().$reset()
  authStore().$reset()
  await navigateTo({ name: 'login' })
}