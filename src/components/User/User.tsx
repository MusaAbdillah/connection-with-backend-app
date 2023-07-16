import axios, { AxiosError, CanceledError } from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // with async await
    // const fetchUsers = async () => {
    //   try {
    //     const res = await axios.get<User[]>(
    //       "https://jsonplaceholder.typicode.com/users"
    //     );
    //     setUsers(res.data);
    //   } catch (err) {
    //     setError((err as AxiosError).message);
    //   }
    // };

    // fetchUsers();

    const controller = new AbortController();

    // call axion get users - first option, more simple
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <h3 className="m-3">Users</h3>
      <ul className="list-inside">
        {users.map((user) => (
          <li key={user.id} className="mb-3">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
