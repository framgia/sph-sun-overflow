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


interface ButtonState {
    isDisabled: boolean
    setIsDisable: () => void
}

export const useButtonStore = create<ButtonState>()((set) => ({
    isDisabled: false,
    setIsDisable: () => set((state) => ({ isDisabled: !state.isDisabled })),
}))
