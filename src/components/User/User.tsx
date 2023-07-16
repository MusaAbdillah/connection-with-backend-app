import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // call axion get users
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.message)),
      []; // to prevent infinitive looping
  });

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
