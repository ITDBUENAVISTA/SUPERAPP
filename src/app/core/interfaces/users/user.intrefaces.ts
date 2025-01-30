import { Person } from "../persons/persons.interface";

export interface User {
  _id: string;
  username: string;
  password?: string;
  rols: string;
  attempts: number;
  person: Person;
}
