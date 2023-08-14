import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import {NameSpace} from '../../const';
import { fetchOfferAction, fetchOffersAction, fetchNearbyOffersAction, fetchReviewsOfferAction } from '../api-actions';

const initialState: AppData = {
  offers: [],
  offer: null,
  nearby: [],
  comments: [],
  isOffersDataLoading: false,
  isDetailsOfferDataLoading: false,
  isOfferNearbyDataLoading: false,
  isReviewsDataLoading: false,
  hasError: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isDetailsOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isDetailsOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isOfferNearbyDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
        state.isOfferNearbyDataLoading = false;
      })
      .addCase(fetchReviewsOfferAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsOfferAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isReviewsDataLoading = false;
      });
  }
});
