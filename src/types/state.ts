import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { Offer } from './offers';
import { Review } from './reviews';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
};

export type AppProcess = {
  activeCity: string;
  sorting: string;
}

export type AppData = {
  offers: Offer[];
  offer: Offer | null;
  comments: Review[];
  nearby: Offer[] | null;
  isOffersDataLoading: boolean;
  isDetailsOfferDataLoading: boolean;
  isOfferNearbyDataLoading: boolean;
  isReviewsDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
