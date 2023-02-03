import { create } from 'zustand'
interface UserState {
    user_id: number
    addUserID: (user: number) => void
}

const useUsertore = create<UserState>()((set) => ({
    user_id: 0,
    addUserID: (user) => set(() => ({ user_id: user })),
}))

export default useUsertore
