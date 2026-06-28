import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  name: localStorage.getItem("name"),
  faction: localStorage.getItem("faction"),

  login: (token, name, faction) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("faction", faction);
    set({ token, name, faction });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("faction");
    set({ token: null, name: null, faction: null });
  },
}));

export default useAuthStore;
