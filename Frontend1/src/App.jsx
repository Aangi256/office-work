import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; // 1. Import Router components
import Form from './Component/Form';
import UserList from './Component/UserList';
import Login from './Component/Login'
import {isLoggedIn,logout} from './Utils/auth.js';

const PrivateRoute = ({children}) => {
  return isLoggedIn() ? children : <Navigate to="/login"/>;
};

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <Router> 
      <div>
      
      {isLoggedIn() && (
        <nav>
          <Link to="/">Form</Link> |{" "}
          <Link to="/users">User List</Link>|{" "}
          <button onClick={() => {
            logout();
            window.location.href = "/login";
          }}>Logout</button>
        </nav>
        )}

        <Routes>
        
          <Route path="/login" element={<Login/>}></Route>

          <Route path="/" element={
            <PrivateRoute>
            <Form 
              selectedUser={selectedUser} 
              clearSelection={() => setSelectedUser(null)} 
              refreshUsers={() => setRefresh(!refresh)} 
            />
            </PrivateRoute>
          } 
          
          />

        
          <Route path="/users" element={
            <PrivateRoute>
            <UserList 
              onEdit={setSelectedUser} 
              refresh={refresh} 
            />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
