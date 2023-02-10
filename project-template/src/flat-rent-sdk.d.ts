export interface database {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: number[];
  price: number;
}
export interface searchParameters {
  city: string,
  checkInDate?: Date,
  checkOutDate?: Date,
  priceLimit?: number
}

export function cloneDate(date: Date): Date;
export function addDays(date: Date, days: number): Date;

export type backendPort = number;
export type localStorageKey = string;

export class FlatRentSdk {
  database: database;

  constructor()
  get(id: string): Promise<Object | null>;
  search(parameters: searchParameters): Promise<Object[] | Error>;
  book(flatId: string, checkInDate: Date, checkOutDate: Date): number;
  _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void | Error;
  _resetTime(date: Date): void;
  _calculateDifferenceInDays(startDate: Date, endDate: Date): number;
  _generateDateRange(from: Date, to: Date): Array<Date>;
  _generateTransactionId(): number;
  _areAllDatesAvailable(flat: database, dateRange: Array<Date>): Array<Date>;
  _formatFlatObject(flat: database, nightNumber?: number): database;
  _readDatabase(): Array<database>;
  _writeDatabase(database: database): void;
  _syncDatabase(database: database): void;
}
