import { create } from 'zustand'
interface UserState {
    user_id: number
    addUserID: (user: number) => void
}

const useUserStore = create<UserState>()((set) => ({
    user_id: 0,
    addUserID: (user) => set(() => ({ user_id: user })),
}))

export default useUserStore
