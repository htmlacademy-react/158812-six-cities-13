import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { Offer, DetailsOffer } from './offers';
import { Review } from './reviews';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
};

export type AppProcess = {
  city: string;
  sorting: string;
}

export type AppData = {
  offers: Offer[];
  offer: DetailsOffer | null;
  comments: Review[];
  nearby: Offer[];
  isOffersDataLoading: boolean;
  isDetailsOfferDataLoading: boolean;
  isOfferNearbyDataLoading: boolean;
  isReviewsDataLoading: boolean;
  hasError: boolean;
  favoriteOffers: Offer[];
  isFavoriteStatusChanged: boolean;
};
