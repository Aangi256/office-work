import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    email: "",
    contact: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, country, email, contact } = formData;


    if (name.trim() === "") {
      alert("Name is required");
      return;
    }

    if (!age || age <= 0) {
      alert("Please enter a valid age");
      return;
    }

    if (country.trim() === "") {
      alert("Country is required");
      return;
    }

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email");
      return;
    }

    if (!contact) {
      alert("Contact number is required");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      alert("Contact must be 10 digits");
      return;
    }

 
    console.log("Form Data:", formData);
    alert("Form submitted successfully ");

  
    setFormData({
      name: "",
      age: "",
      country: "",
      email: "",
      contact: ""
    });
  };

  return (
    <div>
      <h3>User Form</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
