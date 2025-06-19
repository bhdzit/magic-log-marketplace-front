import { create } from "zustand";

interface AuthProps {
  userData: { email: string } | null;
  setUserData: (val: { email: string } | null) => void;
}

export const useAuth = create<AuthProps>((set) => ({
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") ?? "")
    : null,
  setUserData: (val) => set({ userData: val }),
}));
