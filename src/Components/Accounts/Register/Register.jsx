import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoPersonFill, GoMail, GoLock } from "react-icons/go";
import "./Register.css";

const adminUser = {
  name: "Admin",
  email: "admin@shop.com",
  password: "admin123",
  type: "admin",
};

const ensureAdminUser = () => {
  try {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const alreadyExists = storedAccounts.some(
      (user) => user.email === adminUser.email,
    );

    if (!alreadyExists) {
      localStorage.setItem(
        "accounts",
        JSON.stringify([...storedAccounts, adminUser]),
      );
    }

    const currentUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null",
    );
    if (!currentUser || currentUser.email !== adminUser.email) {
      localStorage.setItem("loggedInUser", JSON.stringify(adminUser));
    }
  } catch {
    // ignore localStorage issues in the browser environment
  }
};

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "user",
  });
  const navigate = useNavigate();

  useEffect(() => {
    ensureAdminUser();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const existingAccounts = JSON.parse(
      localStorage.getItem("accounts") || "[]",
    );
    const isUserExist = existingAccounts.find(
      (user) => user.email === formData.email,
    );
    if (isUserExist) {
      alert(
        "This email is already registered. Please use a different email or log in.",
      );
      return;
    }

    const updatedAccounts = [...existingAccounts, formData];
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("loggedInUser", JSON.stringify(formData));
    alert("Account created successfully!");
    navigate("/");
  };

  const handleClose = () => {
    navigate(-1);
  };

  const inputFields = [
    {
      key: "name",
      type: "text",
      placeholder: "Name",
      value: formData.name,
      icon: <GoPersonFill className="input-icon" />,
      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
    },
    {
      key: "email",
      type: "email",
      placeholder: "Email",
      value: formData.email,
      icon: <GoMail className="input-icon" />,
      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
    },
    {
      key: "password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      icon: <GoLock className="input-icon" />,
      onChange: (e) =>
        setFormData({ ...formData, password: e.target.value }),
    },
  ];

  return (
    <div className="accounts-page">
      <form onSubmit={handleRegister} className="auth-form">
        <button
          type="button"
          className="close-auth-btn"
          onClick={handleClose}
          aria-label="Close register form"
        >
          ×
        </button>
        <h2>Register</h2>

        {inputFields.map(
          ({ key, type, placeholder, value, icon, onChange }) => (
            <div className="input-field" key={key}>
              <span className="input-icon-wrap">{icon}</span>
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
              />
            </div>
          ),
        )}
        <button type="submit">Create Account</button>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
