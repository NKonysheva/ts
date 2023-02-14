export interface userType {
  username: string;
  avatarUrl: string;
}
export interface favoritesAmountType {
  favoritesAmount: number
}
export interface Place {
  bookedDates: object[];
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  remoteness: number;
}

export interface MessageToast {
  type: string;
  text: string;
}
export interface Action {
  name: string;
  handler: CallableFunction
}
export interface PlaceEdit {
  id: number;
  image: string;
  name: string;
}
export interface SearchFormData {
  city: string;
  checkin: string;
  checkout: string;
  price: number;
}
