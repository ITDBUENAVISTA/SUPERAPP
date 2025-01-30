import { Person } from "../persons/persons.interface";
import { Pay } from "./payments.interface";

export interface Customer {
  _id: string;
  batch: string,
  quota_value: number,
  finance_amount: number,
  quotas: number,
  type: string,
  person: Person;
  payments: Pay[]
}
