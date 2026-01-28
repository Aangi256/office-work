import { useState } from "react";
import Form from "./Component/Form";
import UserList from "./Component/UserList";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Form
        selectedUser={selectedUser}
        clearSelection={() => setSelectedUser(null)}
        refresh={() => setRefresh(!refresh)}
      />

      <UserList
        onEdit={setSelectedUser}
        refresh={refresh}
      />
    </>
  );
};

export default App;
