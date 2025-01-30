import { Customer } from "../customers/customers.interface";

export interface Vouncher {
  _id?: string;
  date: string;
  status?: string;
  concept: string;
  file?: string;
  customer: Customer
}

export interface VouncherByCustomer {
  [customer: string]: Vouncher[];
}

export interface ListVounchers {
  _id: string;
  person: string;
  date: string;
  status: string;
  concept: string;
  file: string;
  lot: string;
}
