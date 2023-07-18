import apiClient from "./apiClient";
import create from "./httpService";


export interface Customer {
    id: number;
    name: string;
  }

export default create("/users");