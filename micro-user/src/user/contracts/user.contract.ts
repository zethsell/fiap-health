export type User = {
  id: number
  name?: string
  surname?: string
  email?: string
  imgProfile?: string
  imgProfileThumb?: string
}

export interface ListUsers {
  get: () => Promise<ListUsers.Output>
}

export namespace ListUsers {
  export type Output = User[]
}

export interface SaveUser {
  save: (input: SaveUser.Input) => Promise<SaveUser.Output>
}

export namespace SaveUser {
  export type Input = Omit<
    User,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
  > & { id?: number }
  export type Output = User
}

export interface ShowUser {
  show: (input: ShowUser.Input) => Promise<ShowUser.Output>
}

export namespace ShowUser {
  export type Input = { id: number }
  export type Output = User
}

export interface ShowUserByEmail {
  showByEmail: (input: ShowUserByEmail.Input) => Promise<ShowUserByEmail.Output>
}

export namespace ShowUserByEmail {
  export type Input = { email: string }
  export type Output = User
}

export interface ShowUserByConditions {
  showByConditions: (
    input: ShowUserByConditions.Input,
  ) => Promise<ShowUserByConditions.Output>
}

export namespace ShowUserByConditions {
  export type Input = { conditions: Partial<User> }
  export type Output = User
}

export interface DeleteUser {
  delete: (input: DeleteUser.Input) => Promise<void>
}

export namespace DeleteUser {
  export type Input = { id: number }
}
