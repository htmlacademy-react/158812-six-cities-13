import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {Offer} from '../types/offers';
import {changeCity} from './action';
import { DEFAULT_ACTIVE_CITY } from '../const';

function getStartPlaces(offersList: Offer[], city: string) {
  return offersList.filter((offer) => offer.city.name === city);
}

const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  offers: getStartPlaces(offers, DEFAULT_ACTIVE_CITY)
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.offers = getStartPlaces(offers, state.city);
    });
});

export {reducer};
