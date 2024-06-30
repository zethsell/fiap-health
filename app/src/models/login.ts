import type { User } from '~/models/user'

export type LoginResponse = {
  access_token: string
  refresh_token: string
  user: User
}