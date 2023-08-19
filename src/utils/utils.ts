import { SortingType } from '../const';
import {Offer} from '../types/offers';
import { Review } from '../types/reviews';

const COUNT_STARS = 5;

export const calcRating = (rating: number) => `${Math.round(rating) / COUNT_STARS * 100}%`;

export const SortingCallback: {
  [key: string]: (arg0: Offer, arg1: Offer) => number;
  } = {
    [SortingType.Popular]: () => 0,
    [SortingType.LowToHigh]: (a: Offer, b: Offer) => a.price - b.price,
    [SortingType.HighToLow]: (a: Offer, b: Offer) => b.price - a.price,
    [SortingType.TopRated]: (a: Offer, b: Offer) => b.rating - a.rating
  };

export function filterOffersByCity(offersList: Offer[], city: string | undefined, sorting: string) {
  return offersList.filter((offer) => offer.city.name === city).sort(SortingCallback[sorting]);
}

const MAX_COUNT_LAST_REVIEWS = 10;

export const getReviews = (reviews: readonly Review[]): Review[] => (
  [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_COUNT_LAST_REVIEWS)
);
