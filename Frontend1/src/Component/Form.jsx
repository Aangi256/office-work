import React, { useState } from "react";
import "./Form.css";

const Form = ({ refreshUsers }) => {
  const [data, setData] = useState({});

  const handleChange = (e, field) => {
    const value =
      e.target.type === "file" ? e.target.files[0] : e.target.value;

    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { name, age, email, country, image } = data;

    if (!name || !age || !email || !country || !image) {
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

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (!allowedTypes.includes(image.type)) {
      alert("Only image files (jpg, jpeg, png, gif) are allowed");
      return false;
    }

    return true;
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

      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        alert("Form submitted successfully");
        setData({});
        refreshUsers();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert(result.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={data?.name || ""}
          onChange={(e) => handleChange(e, "name")}
        /><br /><br />

        <input
          type="text"
          placeholder="Enter your age"
          value={data?.age || ""}
          onChange={(e) => handleChange(e, "age")}
        /><br /><br />

        <input
          type="email"
          placeholder="Enter your email"
          value={data?.email || ""}
          onChange={(e) => handleChange(e, "email")}
        /><br /><br />

        <select
          value={data?.country || ""}
          onChange={(e) => handleChange(e, "country")}
        >
          <option value="">-- Select Country --</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="dubai">Dubai</option>
          <option value="canada">Canada</option>
        </select><br /><br />

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
        </label><br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e, "image")}
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
