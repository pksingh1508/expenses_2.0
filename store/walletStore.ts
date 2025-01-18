import { create } from "zustand";

interface WalletState {
  walletData: [];
  totalAmount: number;
  totalExpense: number;
  totalIncome: number;
  addWalletData: (data: any) => void;
  updateTotal: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  walletData: [],
  totalAmount: 0,
  totalExpense: 0,
  totalIncome: 0,
  addWalletData: (data: any) => set({ walletData: data }),
  updateTotal: () =>
    set((state) => ({
      totalAmount: state.walletData.reduce(
        (sum, wallet: any) => sum + wallet.total_amount,
        0
      ),
      totalExpense: state.walletData.reduce(
        (sum, wallet: any) => sum + wallet.expense,
        0
      ),
      totalIncome: state.walletData.reduce(
        (sum, wallet: any) => sum + wallet.income,
        0
      )
    }))
}));
