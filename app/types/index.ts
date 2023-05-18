export interface ICurrentUser {
  name: string | null;
  email: string | null;
  image: string | null;
}

export interface ISignupInputs {
  email: string;
  password: string;
  name: string | null;
}
export interface ISigninInputs {
  email: string;
  password: string;
}
export interface IReservationInputs {
  startDate: Date;
  endDate: Date;
  guests: number;
}
export interface ICreateRentalInputs {
  image: string;
  title: string;
  description: string;
  category: string;
  roomsNumber: number;
  bathroomsNumber: number;
  guestsNumber: number;
  price: number;
  location: string;
}
