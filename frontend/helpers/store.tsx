import type { ITag } from '@/components/molecules/TagsInput'
import type { StateCreator } from 'zustand'
import { create } from 'zustand'

export type UserTeamType = {
    id: number
    team: {
        id: number
        name: string
    }
}

interface UserSlice {
    user_id: number
    first_name: string
    last_name: string
    email: string
    avatar: string
    slug: string
    teams: UserTeamType[]
    watchedTags: ITag[]
    updated_at: string
    role?: string
    permissions?: Array<{
        name: string
        category: string
    }>
    setUserID: (
        user_id: number,
        first_name: string,
        last_name: string,
        email: string,
        avatar: string,
        slug: string,
        teams: UserTeamType[],
        watchedTags: ITag[],
        updated_at: string,
        role: string,
        permissions: Array<{
            name: string
            category: string
        }>
    ) => void
    updateProfile: (
        user_id: number,
        first_name: string,
        last_name: string,
        email: string,
        avatar: string,
        slug: string,
        teams: UserTeamType[],
        watchedTags: ITag[],
        updated_at: string
    ) => void

    setWatchedTags: (input: ITag[]) => void
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    slug: '',
    teams: [],
    watchedTags: [],
    updated_at: '',
    role: '',
    permissions: [],
    setUserID: (
        user_id,
        first_name,
        last_name,
        email,
        avatar,
        slug,
        teams,
        watchedTags,
        updated_at,
        role,
        permissions
    ) => {
        set(() => ({
            user_id,
            first_name,
            last_name,
            email,
            avatar,
            slug,
            teams,
            watchedTags,
            updated_at,
            role,
            permissions,
        }))
    },
    updateProfile: (
        user_id,
        first_name,
        last_name,
        email,
        avatar,
        slug,
        teams,
        watchedTags,
        updated_at
    ) => {
        set(() => ({
            user_id,
            first_name,
            last_name,
            email,
            avatar,
            slug,
            teams,
            watchedTags,
            updated_at,
        }))
    },
    setWatchedTags: (input: ITag[]) => {
        set((state) => ({
            ...state,
            watchedTags: input,
        }))
    },
})

export const useBoundStore = create<UserSlice>()((...a) => ({
    ...createUserSlice(...a),
}))
