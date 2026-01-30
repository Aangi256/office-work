import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // 1. Import Router components
import Form from './Component/Form';
import UserList from './Component/UserList';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <Router> 
      <div>
        <nav>
          <Link to="/">Form</Link> | <Link to="/users">User List</Link>
        </nav>

        <Routes>
        
          <Route path="/" element={
            <Form 
              selectedUser={selectedUser} 
              clearSelection={() => setSelectedUser(null)} 
              refresh={() => setRefresh(!refresh)} 
            />
          } />

        
          <Route path="/users" element={
            <UserList 
              onEdit={setSelectedUser} 
              refresh={refresh} 
            />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
