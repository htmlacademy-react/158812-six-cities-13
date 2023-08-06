import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offers';
import {Review} from '../types/reviews';
import { UserData } from '../types/user-data';
import {setActiveCity, changeSort, loadOffers, requireAuthorization, setOffersDataLoadingStatus, setUserInfo, loadOffer, setDetailsOfferDataLoadingStatus, loadNearbyOffers, setOfferNearbyError} from './action';
import {DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION, AuthorizationStatus} from '../const';

type InitialState = {
  activeCity: string;
  offers: Offer[];
  offer: Offer | null;
  comments: Review[];
  sorting: string;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
  isOffersDataLoading: boolean;
  isDetailsOfferDataLoading: boolean;
  nearby: Offer[] | null;
  isOfferNearbyError: boolean;
}

const initialState: InitialState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: [],
  offer: null,
  comments: [],
  sorting: DEFAULT_SORTING_OPTION,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  isOffersDataLoading: false,
  isDetailsOfferDataLoading: false,
  nearby: [],
  isOfferNearbyError: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
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

    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setDetailsOfferDataLoadingStatus, (state, action) => {
      state.isDetailsOfferDataLoading = action.payload;
    })

    .addCase(loadNearbyOffers, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(setOfferNearbyError, (state, action) => {
      state.isOfferNearbyError = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export {reducer};
