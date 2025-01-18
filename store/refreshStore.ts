import { create } from "zustand";

interface Props {
  refreshFlag: boolean;
  toggleRefreshFlag: () => void;
}

export const useRefreshStore = create<Props>((set) => ({
  refreshFlag: false,
  toggleRefreshFlag: () => set((state) => ({ refreshFlag: !state.refreshFlag }))
}));
