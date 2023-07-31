import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {Offer} from '../types/offers';
import {changeCity, changeSort} from './action';
import {DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION} from '../const';

const SortingCallback: {
  [key: string]: (arg0: Offer, arg1: Offer) => number;
  } = {
    Popular: () => 0,
    LowToHigh: (a: Offer, b: Offer) => a.price - b.price,
    HighToLow: (a: Offer, b: Offer) => b.price - a.price,
    TopRated: (a: Offer, b: Offer) => b.rating - a.rating
  };

function getOffers(offersList: Offer[], city: string, sorting = DEFAULT_SORTING_OPTION) {
  return offersList.filter((offer) => offer.city.name === city).sort(SortingCallback[sorting]);
}

const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  offers: getOffers(offers, DEFAULT_ACTIVE_CITY, DEFAULT_SORTING_OPTION),
  sorting: DEFAULT_SORTING_OPTION,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.offers = getOffers(offers, state.city);
    })
    .addCase(changeSort, (state, action) => {
      state.sorting = action.payload;
      state.offers = getOffers(offers, state.city, action.payload);
    });
});

export {reducer};
