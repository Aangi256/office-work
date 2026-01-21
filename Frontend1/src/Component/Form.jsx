import React, { useState } from "react";
// import "./Form.css"

const Form = () => {
  const [data, setData] = useState({});

  const validateForm = () => {
    const { name, age, email, country } = data;

    if (!name || !age || !email || !country) {
      alert("All fields are required");
      return false;
    }

    if (Number(age) <= 0) {
      alert("Age must be greater than 0");
      return false;
    }

    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailExp.test(email)) {
      alert("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleChange = (e, namePara) => {
    setData(prev => ({
      ...prev,
      [namePara]: e.target.value
    }));
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/checkemails",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email }),
      }
    );

    if(!response.ok){
      throw new Error("Failed to check email");
    }
     const result = await response.json();
    return result.exists;
    } catch (error) {
      console.error("Email check error:",error );
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const emailExists =  checkEmailExists(data.email);

    if(await emailExists){
      alert("Email already exists ");
    return;
    }
    else{
    try {
      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Data stored successfully");

        setData({});
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  }
  }; 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name"
          onChange={(e) => handleChange(e, 'name')}
          value={data?.name || ""} /><br/><br/>

        <input type="text" placeholder="Enter your age"
          onChange={(e) => handleChange(e, 'age')}
          value={data?.age || ""} /><br/><br/>

        <input type="email" placeholder="Enter your email"
          onChange={(e) => handleChange(e, 'email')}
          value={data?.email || ""} /><br/><br/>

        <input type="text" placeholder="Enter your country"
          onChange={(e) => handleChange(e, 'country')}
          value={data?.country || ""} /><br/><br/>

        <label>
          <input type="radio" name="Gender" value="Female"
            onChange={(e) => handleChange(e, 'Gender')} /> Female<br/>
          <input type="radio" name="Gender" value="Male"
            onChange={(e) => handleChange(e, 'Gender')} /> Male<br/>
        </label><br/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;


