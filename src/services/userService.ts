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

    deleteUser = (id: number) => {
        return apiClient.delete("/users/" + id)
    }

    addUser = (user: Customer) => {
        return apiClient.post("/users", user)
    }

    updateUser = (payload: Customer) => {
        return apiClient.patch("/users/" + payload.id, payload)
    }



}

export default new UserService;