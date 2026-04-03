import { create } from "zustand";

export type PAGE_SIZE = 25 | 50;

interface AppStore {
  nameFilter: string;
  categoryFilter: string;
  pageNumber: number;
  pageSize: 25 | 50;
  setNameFilter: (nameFilter: string) => void;
  setCategoryFilter: (categoryFilter: string) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useAppsContext = create<AppStore>((set) => ({
  nameFilter: "",
  categoryFilter: "",
  pageNumber: 0,
  pageSize: 25 as 25 | 50,
  setNameFilter: (nameFilter: string) => set({ nameFilter }),
  setCategoryFilter: (categoryFilter: string) => set({ categoryFilter }),
  setPageNumber: (pageNumber: number) => set({ pageNumber }),
  setPageSize: (pageSize: number) => set({ pageSize: pageSize as PAGE_SIZE }),
}));
