import React, { useState } from "react";
import "./Form.css";

const Form = ({ refreshUsers }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e, field) => {
    const value =
      e.target.type === "file" ? e.target.files[0] : e.target.value;

    setData(prev => ({
      ...prev,
      [field]: value
    }));
          
    setErrors(prev => ({
      ...prev,
      [field]: ""
    }));
  };



  const validateForm = () => {
    
    const newErrors = {};
    const { name, age, email, country, image , password } = data;

    if (!name){ 
      newErrors.name = 'Name is required';
    }else if(name.length > 20){
      newErrors.name = 'Name should be of 20 characters';
    }else{ 
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (name && !nameRegex.test(name)) {
      newErrors.name = 'Name must contain only letters and spaces';
      }  
    }

    
    if (!age) {
        newErrors.age = "Age is required";
    } else if (isNaN(age) || !/^\d+$/.test(age)) {
        newErrors.age = "Only numbers are allowed";
    } else if (Number(age) <= 0) {
        newErrors.age = "Age must be greater than 0";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailExp.test(email))
        newErrors.email = "Invalid email address";
    }

    if (!country) {
      newErrors.country = 'Country is required';
    }

    if (!image) {
      newErrors.image = "Image is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(image.type)) {
        newErrors.image = "Only JPG, JPEG, PNG allowed";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

  setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateUser = async (id) => {
  const updatedData = {
    name: "Updated Name",
    age: 25,
    email: "updated@email.com"
  };

  const response = await fetch(
    `http://localhost:5000/api/users/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    }
  );

  const result = await response.json();
  console.log(result);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("Gender", data.Gender);
      formData.append("image", data.image);
      formData.append("password", data.password);

      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        alert("Form submitted successfully");
        setData({});
        refreshUsers();
        setErrors({});
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Enter your name"
          value={data?.name || ""}
          onChange={(e) => handleChange(e, "name")}
          className={errors.name ? "error-input" : ""}   
        />
        {errors.name && <p className="error-text">{errors.name}</p>} 
        <br /><br />

        <input
          type="text"
          placeholder="Enter your age"
          value={data?.age || ""}
          onChange={(e) => handleChange(e, "age")}
          className={errors.age ? "error-input" : ""}
        />
          {errors.age && <p className="error-text">{errors.age}</p>} 
        <br /><br />

        <input
          type="email"
          placeholder="Enter your email"
          value={data?.email || ""}
          onChange={(e) => handleChange(e, "email")}
          className={errors.email ? "error-input" : ""}
        />
          {errors.email && <p className="error-text">{errors.email}</p>} 
        <br /><br />

        <select
          value={data?.country || ""}
          onChange={(e) => handleChange(e, "country")}
          className={errors.country ? "error-input" : ""}
        >
          <option value="">-- Select Country --</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="dubai">Dubai</option>
          <option value="canada">Canada</option>
        </select>
          {errors.country && <p className="error-text">{errors.country}</p>} 
        <br /><br />

        <label>
          <input
            type="radio"
            name="Gender"
            value="Female"
            onChange={(e) => handleChange(e, "Gender")}
          /> Female
          <input
            type="radio"
            name="Gender"
            value="Male"
            onChange={(e) => handleChange(e, "Gender")}
          /> Male
        </label>
          {errors.Gender && <p className="error-text">{errors.Gender}</p>} 
        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e, "image")}
          className={errors.image ? "error-input" : ""} 
        />
          {errors.image && <p className="error-text">{errors.image}</p>} 
        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={data.password || ""}
          onChange={(e) => handleChange(e, "password")}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;




