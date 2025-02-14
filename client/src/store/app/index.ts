import { ILead } from "@/types/lead";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  searchText: string;
  debouncedSearchText: string;
  sortBy: string;
  order: string;
  currentPage: number;
  itemsPerPage: number;
  leadToEdit: ILead | null;
  selectedLeads: number[];
  isLeadDrawerOpen: boolean;
  isFilterAndSortOpen: boolean;
  isModalOpen: boolean;
  onConfirmAction: () => void;
}

const initialState: IAppState = {
  searchText: "",
  debouncedSearchText: "",
  sortBy: "",
  order: "",
  currentPage: 1,
  itemsPerPage: 10,
  leadToEdit: null,
  selectedLeads: [],
  isLeadDrawerOpen: false,
  isFilterAndSortOpen: false,
  isModalOpen: false,
  onConfirmAction: () => {},
};

const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setDebouncedSearchText: (state, action: PayloadAction<string>) => {
      state.debouncedSearchText = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<"asc" | "desc" | "">) => {
      state.order = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setLeadToEdit: (state, action: PayloadAction<ILead | null>) => {
      state.leadToEdit = action.payload;
    },
    setSelectedLeads: (state, action: PayloadAction<number[]>) => {
      const leadIds = action.payload;
      const isRemoving = leadIds.every((id) => state.selectedLeads.includes(id));

      state.selectedLeads = isRemoving
        ? state.selectedLeads.filter((id) => !leadIds.includes(id))
        : [...new Set([...state.selectedLeads, ...leadIds])];
    },

    toggleLeadDrawer: (state) => {
      state.isLeadDrawerOpen = !state.isLeadDrawerOpen;
      if (!state.isLeadDrawerOpen) state.leadToEdit = null;
    },
    toggleFilterAndSort: (state) => {
      state.isFilterAndSortOpen = !state.isFilterAndSortOpen;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setOnConfirmAction: (state, action: PayloadAction<() => void>) => {
      state.onConfirmAction = action.payload;
    },
  },
});

export const {
  setSearchText,
  setDebouncedSearchText,
  setSortBy,
  setOrder,
  setCurrentPage,
  setItemsPerPage,
  setLeadToEdit,
  setSelectedLeads,
  toggleLeadDrawer,
  toggleFilterAndSort,
  toggleModal,
  setOnConfirmAction,
} = appSlice.actions;

export default appSlice.reducer;
