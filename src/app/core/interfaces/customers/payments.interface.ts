import { Person } from "../persons/persons.interface";

export interface Pay {
  _id: string,
  date: string,
  mount: number,
  capital_balance: string,
  batch: string,
  concept: string,
  quota_value: number,
  corresponding_month: string,
  person: Person
}
