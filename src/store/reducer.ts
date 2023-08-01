import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {setActiveCity, changeSort, fetchOffers} from './action';
import {DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION} from '../const';

const initialState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: offers,
  sorting: DEFAULT_SORTING_OPTION,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(changeSort, (state, action) => {
      state.sorting = action.payload;
    });
});

export {reducer};
