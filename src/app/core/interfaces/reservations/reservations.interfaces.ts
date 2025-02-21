import { Customer } from "../customers/customers.interface";

export interface Reservation {
  _id?: string,
  date: string,
  schedule: string,
  people?: number,
  pool: boolean,
  grill: boolean,
  customer?: Customer
}

export interface ReservationDay {
  date: string,
  reservations: Reservation[]
}
