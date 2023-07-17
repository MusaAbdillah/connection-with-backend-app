import apiClient from "./apiClient";

export interface Customer {
    id: number;
    name: string;
  }
  

class UserService {

    getAllUsers = () => {
        const controller = new AbortController();
        const request = apiClient
        .get<Customer[]>("/users", {
          signal: controller.signal,
        })

        return {request, cancel: () => controller.abort}
    }

    deleteUser = (user: Customer) => {
        const request = apiClient.delete("/users/" + user.id)
        return request
    }

    addUser = (user: Customer) => {
        const request = apiClient.post("/users", user)
        return request
    }

    updateUser = (id: number,  payload: Customer) => {
        const request = apiClient.patch("/users/" + id, payload)
        return request
    }



}

export default new UserService;