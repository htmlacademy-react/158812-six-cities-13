import { createAction } from '@reduxjs/toolkit';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({payload: city}));

export const fetchOffers = createAction('offers/fetchOffers');

export const changeSort = createAction('offers/changeSort', (sorting: string) => ({payload: sorting}));
