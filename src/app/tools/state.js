import { create } from "zustand";

const AuthState = create((set) => ({
  isAuth: false,
  isUser: false,
  user: null,

  userSuccess: () => set({ isUser: true }),
  userFailure: () => set({ isUser: false }),
  authSuccess: () => set({ isAuth: true }),
  authFailure: () => set({ isAuth: false }),
  setUser: (newUser) => set({ user: newUser }),
}));

export default AuthState;
