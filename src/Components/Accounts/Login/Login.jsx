import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoMail, GoLock } from "react-icons/go";
import "./Login.css";

const adminUser = {
  name: "Admin",
  email: "admin@shop.com",
  password: "admin123",
  type: "admin",
};

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    type: "user",
  });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const seededAccounts = accounts.some(
      (account) => account.email === adminUser.email,
    )
      ? accounts
      : [...accounts, adminUser];

    const user = seededAccounts.find(
      (acc) =>
        acc.email === loginData.email && acc.password === loginData.password,
    );

    if (user) {
      localStorage.setItem("accounts", JSON.stringify(seededAccounts));
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Welcome back, " + user.name);
      navigate("/");
    } else {
      alert("You do not have an account or the data is incorrect!");
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const inputFields = [
    {
      key: "email",
      type: "email",
      placeholder: "Email",
      value: loginData.email,
      icon: <GoMail className="input-icon" />,
      onChange: (e) => setLoginData({ ...loginData, email: e.target.value }),
    },
    {
      key: "password",
      type: "password",
      placeholder: "Password",
      value: loginData.password,
      icon: <GoLock className="input-icon" />,
      onChange: (e) =>
        setLoginData({ ...loginData, password: e.target.value }),
    },
  ];

  return (
    <div className="accounts-page">
      <form onSubmit={handleLogin} className="auth-form">
        <button
          type="button"
          className="close-auth-btn"
          onClick={handleClose}
          aria-label="Close login form"
        >
          ×
        </button>
        <h2>Login</h2>

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

        <button type="submit">Sign in</button>
        <p>
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
