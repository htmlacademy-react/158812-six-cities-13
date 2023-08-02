import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offers';
import {Review} from '../types/reviews';
import {setActiveCity, changeSort, getOffers, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus} from './action';
import {DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION, AuthorizationStatus} from '../const';

type InitialState = {
  activeCity: string;
  offers: Offer[];
  comments: Review[];
  sorting: string;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: [],
  comments: [],
  sorting: DEFAULT_SORTING_OPTION,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
