import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION, SortingType} from '../../const';
import {AppProcess} from '../../types/state';

const initialState: AppProcess = {
  activeCity: DEFAULT_ACTIVE_CITY,
  sorting: DEFAULT_SORTING_OPTION,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    selectCityAction: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    },
    setSortingType: (state, action: PayloadAction<SortingType>) => {
      state.sorting = action.payload;
    },
  },
});

export const { selectCityAction, setSortingType } = appProcess.actions;
