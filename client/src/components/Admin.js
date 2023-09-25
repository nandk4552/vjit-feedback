import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Register.css";
import { PiStudent } from "react-icons/pi";
import toast from "react-hot-toast";
import Logo from "./Logo";

const Admin = () => {
  const [info, setInfo] = useState({
    username: "",
    passwordv: "",
  });
  const { username, passwordv } = info;

  const [allow, setAllow] = useState(false);

  const changeHandler3 = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const verifyHandler = (e) => {
    e.preventDefault();
    console.log(username + passwordv);

    if (username && passwordv) {
      axios
        .post(`${process.env.REACT_APP_API}/verifyadminlogin`, {
          username: username,
          passwordv: passwordv,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", "admin");
            localStorage.setItem("email", username);
            setAllow(true);
            toast.success("Login Successfully...!");
          } else {
            toast.error(res.data);
          }
        });
    } else {
      toast.error("inValid Details");
    }
  };

  if (allow) {
    return <Navigate to="/adminDashboard" />;
  }
  if (localStorage.getItem("token")) {
    return <Navigate to="/adminDashboard" />;
  }
  return (
    <div className="image">
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-blue">
        <div className="container-fluid">
          <Link
            className="navbar-brand display-6 fw-bolder text-uppercase "
            to="/"
          >
            VJIT Feedback Portal
          </Link>
          <span className="navbar-text d-flex align-items-center justify-content-center">
            <Link
              to="/login"
              className="btn-sm btn-danger  text-white text-decoration-none px-3 py-2 "
            >
              <PiStudent className="me-1" />
              Student Login
            </Link>
          </span>
        </div>
      </nav> */}
      <Logo />
      <section className="container">
        <h2 className=" app-red text-uppercase fw-bold mt-5">Admin Sign In</h2>
        <p
          className="py-2 text-black-50 fw-bold"
          style={{ paddingBottom: "1rem" }}
        >
          Only Admins are allowed
        </p>
        <form onSubmit={verifyHandler}>
          <input
            className="form-control-lg m-1 border shadow-sm"
            style={{ width: "50%" }}
            type="text"
            placeholder="Enter Admin username"
            name="username"
            value={username}
            onChange={changeHandler3}
          />
          <br />
          <br />
          <input
            className="form-control-lg m-1 border shadow-sm"
            style={{ width: "50%" }}
            type="password"
            placeholder="Enter password"
            name="passwordv"
            value={passwordv}
            onChange={changeHandler3}
          />
          <br />
          <br />
          <input
            type="submit"
            className="btn btn-primary ms-1 px-3 py-2 btn-blue"
            value="verify Admin"
            style={{ marginBottom: "1rem" }}
          />
        </form>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Admin;
