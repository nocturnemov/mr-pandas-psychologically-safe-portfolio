import { create } from "zustand";

export const useUI = create((set) => ({
  ready: false, // fonts loaded, textures can be drawn
  openPanel: null, // key into content.panels
  setReady: () => set({ ready: true }),
  open: (key) => set({ openPanel: key }),
  close: () => set({ openPanel: null }),
}));
