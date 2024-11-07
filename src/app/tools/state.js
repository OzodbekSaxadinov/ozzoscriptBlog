import { create } from 'zustand';

const AuthState = create((set) => ({
  isAuth: false,
  isUser:false,
  userSuccess: () => set({isUser: true}),
  userFailure: () => set({isUser: false}),
  authSuccess: () => set({ isAuth: true }),
  authFailure: () => set({ isAuth: false }),
}));

export default AuthState;
