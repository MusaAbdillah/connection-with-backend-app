import { useEffect, useState } from "react";
import { Customer } from "../services/userService";
import UserService  from "../services/userService";
import { CanceledError } from "../services/apiClient";


const useUsers = () => { 
    const [users, setUsers] = useState<Customer[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      // with async await
      // const fetchUsers = async () => {axios
      //   try {
      //     const res = await axios.get<User[]>(
      //       "/users"
      //     );
      //     setUsers(res.data);
      //   } catch (err) {
      //     setError((err as AxiosError).message);
      //   }
      // };
  
      // fetchUsers();
  
      const controller = new AbortController();
      setIsLoading(true);
  
      // call axion get users - first option, more simple
      const { request, cancel } = UserService.getAll<Customer>();
      request
        .then((res) => {
          setUsers(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setIsLoading(false);
        });
  
      cancel();
    }, []);

    return {users, error, isLoading, setUsers, setError};
}

export default useUsers