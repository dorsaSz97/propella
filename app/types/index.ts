import { Dispatch, SetStateAction } from 'react';

export type FiltersType = {
  location: string;
  guests: { adults: number; children: number; pets: number };
  calender: { startDate: Date | undefined; endDate: Date | undefined };
};

export type PopupProps = {
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  setStep: Dispatch<SetStateAction<Steps | null>>;
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
