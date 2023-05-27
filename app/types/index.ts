import { Dispatch, SetStateAction } from 'react';

export type formTypes = {
  type: 'login' | 'register';
};
export type FiltersType = {
  location: string;
  guests: { adults: number; children: number; pets: number };
  calender: { startDate: Date | undefined; endDate: Date | undefined };
};

export type PopupProps = { setFilters: Dispatch<SetStateAction<FiltersType>> };
