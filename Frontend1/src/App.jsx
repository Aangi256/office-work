import React, { useEffect, useState } from "react";
import Form from "./Component/Form";
import UserList from "./Component/UserList";

const App = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Form refreshUsers={fetchUsers} />
      <UserList users={users} />
    </div>
  );
};

export default App;
