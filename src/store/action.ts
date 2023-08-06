import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import { Review } from '../types/reviews';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({payload: city}));
export const changeSort = createAction('offers/changeSort', (sorting: string) => ({payload: sorting}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const loadOffer = createAction<Offer>('data/loadOffer');
export const setDetailsOfferDataLoadingStatus = createAction<boolean>('data/setDetailsOfferDataLoadingStatus');

export const loadNearbyOffers = createAction('data/loadNearbyOffers', (nearby: Offer[] | null) => ({payload: nearby}));
export const setOfferNearbyError = createAction<boolean>('data/setOfferNearbyError');

export const loadComments = createAction('data/loadComments', (comments: Review[] | null) => ({payload: comments}));
export const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserInfo = createAction('user/setUserInfo', (userInfo: UserData | null) => ({payload: userInfo}));

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const postComment = createAction('data/postComment', (newComment: CommentData) => ({payload: newComment}));
