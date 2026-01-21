import React,{useState,useEffect} from 'react'

const UserList = () => {
    const [users,setUsers] = useState([]);
   

    useEffect(() => {
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log("Error fetching users",error);
        }
    };

    getUsers();
    }, []);
  return (
    <div className = "table-container">
        <h2>User List</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Country</th>
                </tr>
            </thead>

            <tbody>
                {users.length === 0 ?(
                    <tr>
                        <td colSpan="4">No users found</td>
                    </tr>
                ):(
                    users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.country}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
  );
};

export default UserList