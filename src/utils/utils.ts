import {Offer} from '../types/offers';

const COUNT_STARS = 5;

export const calcRating = (rating: number) => `${Math.round(rating) / COUNT_STARS * 100}%`;

export const SortingCallback: {
  [key: string]: (arg0: Offer, arg1: Offer) => number;
  } = {
    Popular: () => 0,
    LowToHigh: (a: Offer, b: Offer) => a.price - b.price,
    HighToLow: (a: Offer, b: Offer) => b.price - a.price,
    TopRated: (a: Offer, b: Offer) => b.rating - a.rating
  };

export function filterOffersByCity(offersList: Offer[], city: string | undefined, sorting: string) {
  return offersList.filter((offer) => offer.city.name === city).sort(SortingCallback[sorting]);
}
