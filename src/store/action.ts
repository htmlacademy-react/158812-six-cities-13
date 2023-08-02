import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import {AuthorizationStatus} from '../const';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({payload: city}));

export const fetchOffers = createAction('data/offers', (offers: Offer[]) => ({payload: offers}));

export const changeSort = createAction('offers/changeSort', (sorting: string) => ({payload: sorting}));

export const loadOffers = createAction<Offer[]>('loading/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('game/setError');
