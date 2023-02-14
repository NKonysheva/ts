export interface PlaceListResponse {
  errorMessage?: string
  items: Place[]
}
export interface PlaceResponse {
  errorMessage?: string
  item: Place
}
export interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  price: number;
  bookedDates: Array<Date>;
}
