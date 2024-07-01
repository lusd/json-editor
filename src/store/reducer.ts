import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { IJSONModel } from './types';

interface AppState {
  search: {
    value: string;
  };
  items: IJSONModel[];
  isLoading: boolean;
}

const initialState: AppState = {
	search: {
		value: '',
	},
	items: [],
	isLoading: true,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search.value = action.payload;
		},
		setItems: (state, action: PayloadAction<{ data: IJSONModel[] }>) => {
			state.items = action.payload.data;
		},
		setItemByIndex: (state, action: PayloadAction<{ key: string; value: any, index: number }>) => {
			state.items[action.payload.index] = {
				...state.items[action.payload.index],
				[action.payload.key]: action.payload.value,
			};
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const {
	setSearch, setItems, setItemByIndex, setLoading,
} = appSlice.actions;

export const selectSearch = (state: RootState) => state.appReducer.search;
export const selectItems = (state: RootState) => state.appReducer.items;
export const selectLoading = (state: RootState) => state.appReducer.isLoading;

export default appSlice.reducer;
