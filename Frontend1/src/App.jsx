import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Form from './Component/Form';
import UserList from './Component/UserList';
import Login from './Component/Login';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      {isAuthenticated && (
        <nav style={{ padding: "10px" }}>
          <Link to="/">Form</Link> |{" "}
          <Link to="/users">User List</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Form
                selectedUser={selectedUser}
                clearSelection={() => setSelectedUser(null)}
                refreshUsers={() => setRefresh(!refresh)}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList onEdit={setSelectedUser} refresh={refresh} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
