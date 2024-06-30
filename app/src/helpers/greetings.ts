import { userStore } from '~/store'

export const greetings = (): string => {
  const now = new Date()
  const hour = now.getHours()
  const store = userStore()

  let message = 'Boa madrugada'


  if ((hour >= 6) && (hour <= 12)) {
    message = 'Bom dia'
  }

  if ((hour >= 12) && (hour <= 18)) {
    message = 'Boa tarde'
  }

  if ((hour >= 18) && (hour <= 24)) {
    message = 'Boa noite'
  }

  return ` ${message} ${store.getUser.name} `

}