export enum ImageType {
  Main = "main",
  Kitchen = "kitchen",
  Bathroom = "bathroom",
  Bedroom = "bedroom",
}

export type FormValues = {
  title: string;
  description: string;
  options: string[];
  images: { type: ImageType; url: string }[];
  price: number;
  allowedGuests: number;
  address: string;
  availableDates: Date[];
  country: string;
};
