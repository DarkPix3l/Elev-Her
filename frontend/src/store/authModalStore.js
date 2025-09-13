import { create } from 'zustand';

export const useAuthModalStore = create((set, get) => ({
  isOpen: false,
  shouldRender: false,
  timeoutId: null,

  openModal: () =>
    set((state) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        return { isOpen: true, shouldRender: true, timeoutId: null };
      }
      return { isOpen: true, shouldRender: true };
    }),

  closeModal: () => {
    const state = get();

    if (!state.isOpen) return;

    set({ isOpen: false });

    const newTimeoutId = setTimeout(() => {
      set((s) => ({ ...s, shouldRender: false, timeoutId: null }));
    }, 300);

    set({ timeoutId: newTimeoutId });
  },
}));
