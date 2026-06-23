import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),

  login: (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    set({ token, username });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    set({ token: null, username: null });
  },
}));

export default useAuthStore;
