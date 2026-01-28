import React from "react";
import "./UserList.css";

const UserList = ({ users }) => {
  return (
    <div className="userlist-container">
      <div className="table-container">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Country</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>
                    {user.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${user.image}`}
                        alt="user"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
