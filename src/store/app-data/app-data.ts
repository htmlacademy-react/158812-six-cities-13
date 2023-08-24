import { createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state';
import { NameSpace } from '../../const';
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
    resetFavoriteStatus: (state) => {
      state.favoriteOffers = [];
    }
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
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isDetailsOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isOfferNearbyDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
        state.isOfferNearbyDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isOfferNearbyDataLoading = false;
      })
      .addCase(fetchReviewsOfferAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsOfferAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchReviewsOfferAction.rejected, (state) => {
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
        state.isFavoriteStatusChanged = false;
      })
      .addCase(changeFavoriteOfferStatusAction.fulfilled, (state, action) => {
        state.isFavoriteStatusChanged = false;
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
        state.offers = [
          ...state.offers.slice(0, index),
          action.payload,
          ...state.offers.slice(index + 1)
        ];

        if (action.payload.isFavorite && !state.favoriteOffers.find((favoriteOffer) => favoriteOffer.id === action.payload.id)) {
          state.favoriteOffers = [...state.favoriteOffers, action.payload];
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== action.payload.id);
        }

        if (state.offer?.id === action.payload.id) {
          state.offer = {...state.offer, isFavorite: !state.offer.isFavorite};
        }

        if (state.nearby.find((nearbyOffer) => nearbyOffer.id === action.payload.id)) {
          const nearbyIndex = state.nearby.findIndex((nearbyOffer) => nearbyOffer.id === action.payload.id);
          state.nearby = [
            ...state.nearby.slice(0, nearbyIndex),
            action.payload,
            ...state.nearby.slice(nearbyIndex + 1)
          ];
        }
      });
  }
});

export const {resetFavoriteStatus} = appData.actions;
