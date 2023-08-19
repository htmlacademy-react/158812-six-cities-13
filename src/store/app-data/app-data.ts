import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import {NameSpace} from '../../const';
import { fetchOfferAction, fetchOffersAction, fetchNearbyOffersAction, fetchReviewsOfferAction, postCommentAction, fetchFavoriteOffersAction, changeFavoriteOfferStatusAction } from '../api-actions';
import { toast } from 'react-toastify';

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
  favoriteOffers: [],
  isFavoriteStatusChanged: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    /*resetFavoriteStatus: (state, action) => {
      //state.isFavoriteStatusChanged = action.payload;
      state.isFavoriteStatusChanged = false;
    }*/
  },
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
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(postCommentAction.rejected, () => {
        toast.warn('Error sending comment! Try again later');
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteStatusChanged = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteStatusChanged = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isFavoriteStatusChanged = true;
      })
      .addCase(changeFavoriteOfferStatusAction.pending, (state) => {
        state.isFavoriteStatusChanged = false;
      })
      .addCase(changeFavoriteOfferStatusAction.fulfilled, (state) => {
        state.isFavoriteStatusChanged = true;
      });
  }
});
