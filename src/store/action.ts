import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import { Review } from '../types/reviews';
import {AuthorizationStatus, AppRoute} from '../const';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({payload: city}));

export const getOffers = createAction('data/getOffers', (offers: Offer[]) => ({payload: offers}));

export const getComments = createAction('data/getComments', (comments: Review[] | null) => ({payload: comments}));

export const changeSort = createAction('offers/changeSort', (sorting: string) => ({payload: sorting}));

export const loadOffers = createAction<Offer[]>('loading/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
