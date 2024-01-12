import { Kindergarden } from "./Kindergarden";

export interface Child {
    id: string;
    name: string;
    birthDate: string,
    registrationDate: string,
    kindergardenId: number
  }

  export interface ChildResponse {
    id: string;
    name: string;
    birthDate: string,
    registrationDate: string,
    kindergarden: Kindergarden,
    kindergardenId: number
  }