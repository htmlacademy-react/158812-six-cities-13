import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offers';
import {Review} from '../types/reviews';
import { UserData } from '../types/user-data';
import {setActiveCity, changeSort, getOffers, loadOffers, requireAuthorization, setOffersDataLoadingStatus, setUserInfo} from './action';
import {DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION, AuthorizationStatus} from '../const';

type InitialState = {
  activeCity: string;
  offers: Offer[];
  comments: Review[];
  sorting: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  userInfo: UserData | null;
}

const initialState: InitialState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: [],
  comments: [],
  sorting: DEFAULT_SORTING_OPTION,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  userInfo: null,
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
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export {reducer};
