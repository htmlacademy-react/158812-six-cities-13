import {TypeOffer} from '../const';

export type Point = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Point;
};

type OfferHost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: keyof typeof TypeOffer;
  price: number;
  city: City;
  location: Point;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type DetailsOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  images: string[];
  goods: string[];
  host: OfferHost;
  bedrooms: number;
  maxAdults: number;
};
