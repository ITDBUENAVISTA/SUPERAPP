import { Customer } from "../customers/customers.interface";

export interface Vouncher {
  _id?: string;
  date: string;
  status?: string;
  concept: string;
  file?: string;
  receipt?: string;
  number?: number;
  customer: Customer;
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
  number: number;
  file: string;
  receipt: string;
  lot: string;
  comment: string;
  tenant: string;
}
