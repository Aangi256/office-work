import React, { useState, useEffect } from "react";
import "./UserList.css";

const LIMIT = 5;

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({
    key: "name",
    direction: "asc",
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(
         `http://localhost:5000/api/users?page=${currentPage}&limit=${LIMIT}&search=${search}&sort=${sorting.key}&order=${sorting.direction}`,
         {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         }
      );

      const data = await response.json();

      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, refresh, search , sorting.key , sorting.direction]);


  const requestSort = (key) => {
    let direction = "asc";
    if (sorting.key === key && sorting.direction === "asc") {
      direction = "desc";
    }
    setSorting({ key, direction });
    setCurrentPage(1);
  };

  const getSortIndicator = (key) => {
    if (sorting.key === key) {
      return sorting.direction === "asc" ? " ▲" : " ▼";
    }
    return "";
  };

  return (
    <div className="table-container">
      <h2>User List</h2>

  
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => {setSearch(e.target.value);
        setCurrentPage(1);
        }}
        
        style={{ marginBottom: "10px", padding: "8px", width: "220px" }}
      />

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th
              onClick={() => requestSort("name")}
              style={{ cursor: "pointer" }}
            >
              Name{getSortIndicator("name")}
            </th>

            <th
              onClick={() => requestSort("age")}
              style={{ cursor: "pointer" }}
            >
              Age{getSortIndicator("age")}
            </th>

            <th
              onClick={() => requestSort("email")}
              style={{ cursor: "pointer" }}
            >
              Email{getSortIndicator("email")}
            </th>

            <th
              onClick={() => requestSort("country")}
              style={{ cursor: "pointer" }}
            >
              Country{getSortIndicator("country")}
            </th>

            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {!users || users.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
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
                      width="60"
                      height="60"
                      style={{ objectFit: "cover" }}
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


      <div className="pagination-container">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
