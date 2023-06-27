import { Dispatch, SetStateAction } from "react";

export type Filters = {
  location: string;
  duration: { startDate: Date | undefined; endDate: Date | undefined };
  guests: { adults: number; children: number; pets: number };
};
export enum Steps {
  Location = 1,
  Duration,
  Guests,
}

export interface ICreatePropInputs {
  title: string;
  description: string;
  price: number | null;
  country: string;
  address: string;
  allowedGuests: number;
  availableDates: Date[];
  options: string[];
  images: string[];
}

export interface IRegisterInputs {
  name: string;
  email: string;
  password: string;
}

export type ImageGallery = {
  main: string;
  kitchen: string;
  bathroom: string;
  bedroom: string;
};

export enum Page {
  Home,
  Reservations,
  Favorites,
  Properties,
}
