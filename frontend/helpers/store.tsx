import { create, StateCreator } from 'zustand'

interface UserSlice {
    user_id: number
    first_name: string
    last_name: string
    email: string
    avatar: string
    setUserID: (
        user_id: number,
        first_name: string,
        last_name: string,
        email: string,
        avatar: string
    ) => void
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    setUserID: (user_id, first_name, last_name, email, avatar) =>
        set(() => ({
            user_id,
            first_name,
            last_name,
            email,
            avatar,
        })),
})

export const useBoundStore = create<UserSlice>()((...a) => ({
    ...createUserSlice(...a),
}))
