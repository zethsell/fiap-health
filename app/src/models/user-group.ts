import type {User} from "~/models/user.ts";

export type UserGroup = {
    id: number
    name: string
    permissions: string[]
    users: User[]
    created_at?: string
    updated_at?: string
}