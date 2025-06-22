import { create } from "zustand";

interface AuthProps {
  userData: { email: string; rol: number } | null;
  setUserData: (val: { email: string; rol: number } | null) => void;
}

export const useAuth = create<AuthProps>((set) => ({
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") ?? "")
    : null,
  setUserData: (val) => {
    if (val === null) localStorage.removeItem("userData");
    set({ userData: val });
  },
}));
