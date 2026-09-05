import { create } from 'zustand';

import { devtools } from 'zustand/middleware';

export const useLoginStore = create()(
  devtools((set) => ({
    isLogin: false,
    setIsLogin: (isLogin: boolean) => set({ isLogin }),
  })),
);
