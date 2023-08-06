import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Offer} from '../types/offers';
import {loadOffers, requireAuthorization, setOffersDataLoadingStatus, redirectToRoute, setUserInfo, loadOffer, setDetailsOfferDataLoadingStatus, loadNearbyOffers, setOfferNearbyError, loadComments, setReviewsDataLoadingStatus} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { Review } from '../types/reviews.js';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setDetailsOfferDataLoadingStatus(true));
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(setDetailsOfferDataLoadingStatus(false));
      dispatch(loadOffer(data));
    } catch {
      dispatch(setDetailsOfferDataLoadingStatus(true));
      dispatch(redirectToRoute(AppRoute.NotFound));
      dispatch(setDetailsOfferDataLoadingStatus(false));
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadNearbyOffers',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOfferNearbyError(true));
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOfferNearbyError(false));
    dispatch(loadNearbyOffers(data));
  },
);

export const fetchReviewsOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadComments',
  async (id, { dispatch, extra: api }) => {
    dispatch(setReviewsDataLoadingStatus(true));
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}${id}`);
    dispatch(setReviewsDataLoadingStatus(false));
    dispatch(loadComments(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(setUserInfo(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserInfo(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUserInfo(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
