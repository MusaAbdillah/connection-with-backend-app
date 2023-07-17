import { useState, useEffect } from "react";
import { CanceledError } from "../../services/apiClient";
import UserService, { Customer } from "../../services/userService";

function User() {
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
    const { request, cancel } = UserService.getAllUsers();
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

  const deleteUser = (user: Customer) => {
    const originalUsers = [...users];
    const request = UserService.deleteUser(user.id);

    setUsers(users.filter((usr) => usr.id !== user.id));
    request.catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const newUser = { id: 0, name: "Mosh" };
    const originalUsers = [...users];
    const request = UserService.addUser(newUser);
    // append: Add something to the end.
    // prepend: Add something to the beginning.
    // Dec 2, 2021
    // setUsers([...users, newUser]); //append
    setUsers([newUser, ...users]); //

    request
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: Customer) => {
    const updatedUser = { ...user, name: user.name + "!" };
    const originalUsers = [...users];
    const request = UserService.updateUser(updatedUser);

    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    request.catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <h3 className="m-3">Users</h3>
      <button className="btn btn-primary mb-3" onClick={() => addUser()}>
        Add User
      </button>
      <ul className="list-inside list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item mb-3 d-flex justify-content-between"
          >
            {user.name}{" "}
            <div>
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
