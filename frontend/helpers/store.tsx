import { create, StateCreator } from 'zustand'

type TeamType = {
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
    teams: TeamType[]
    updated_at: string
    setUserID: (
        user_id: number,
        first_name: string,
        last_name: string,
        email: string,
        avatar: string,
        slug: string,
        teams: TeamType[],
        updated_at: string
    ) => void
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    slug: '',
    teams: [],
    updated_at: '',
    setUserID: (user_id, first_name, last_name, email, avatar, slug, teams, updated_at) =>
        set(() => ({
            user_id,
            first_name,
            last_name,
            email,
            avatar,
            slug,
            teams,
            updated_at,
        })),
})

export const useBoundStore = create<UserSlice>()((...a) => ({
    ...createUserSlice(...a),
}))
