import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION} from '../../const';
import {AppProcess} from '../../types/state';

const initialState: AppProcess = {
  city: DEFAULT_ACTIVE_CITY,
  sorting: DEFAULT_SORTING_OPTION,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSort: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    }
  },
});

export const { changeCity, changeSort } = appProcess.actions;
