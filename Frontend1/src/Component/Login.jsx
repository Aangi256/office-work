// import React from 'react'
// import {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios'

// const Login = () => {

//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");
//     const navigate = useNavigate();


//     const handleLogin = async () => {
//         try {
//             const res = await axios.post("http://localhost:5000/api/users/login",
//                 {email , password}
//             );

//             localStorage.setItem("token", res.data.token);

//             navigate("/")
//         } catch(error) {
//             console.error("Login error:", error);

//                 if (error.response) {
//                     // Backend responded with error status
//                     alert(error.response.data.message);
//                 } else {
//                     // Network / server error
//                     alert("Server not reachable");
//                 }
//         }
//     }
//   return (
//     <div>
//         <h2>Login</h2>
//         <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" onChange = {e => setPassword(e.target.value)} />
//         <button onClick={handleLogin}>Login</button>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
