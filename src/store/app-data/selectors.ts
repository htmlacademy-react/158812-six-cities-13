import {NameSpace} from '../../const';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;

export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;
export const getOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDetailsOfferDataLoading;

export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearby;
export const getNearbyOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOfferNearbyDataLoading;

export const getComments = (state: State): Review[] => state[NameSpace.Data].comments;
export const getCommentsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isReviewsDataLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getFavoriteOffersCount = (state: State): number => state[NameSpace.Data].favoriteOffers.length;
export const getFavoriteStatusChange = (state: State) => state[NameSpace.Data].isFavoriteStatusChanged;

