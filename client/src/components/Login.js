import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import UserHeader from "../headers/UserHeader";

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [data, seData] = useState({
    email: "",
    clgId: "",
  });
  const { email, clgId } = data;

  const changeHandler = (e) => {
    seData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/login`, data).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("dept", res.data.id);
        setAuth(true);
      } else {
        alert(res.data);
      }
    });
  };

  if (auth) {
    return <Navigate to="/instructions" />;
  }

  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="con">
      <UserHeader />

      <div className="box shadow">
        <section className="container">
          <h1
            className="large text-uppercase fw-bold py-2"
            style={{
              color: "orange",
              marginTop: "100px",
              marginBottom: "1rem",
            }}
          >
            Sign In
          </h1>
          <p className="lead text-secondary fst-italic">
            <b>Sign into Your Account</b>
          </p>
          <form onSubmit={submitHandler} className="container">
            <input
              className="form-control-lg mb-1 border"
              style={{ width: "60%" }}
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={changeHandler}
            />
            <br />
            <br />
            <input
              className="form-control-lg mb-1 border"
              style={{ width: "60%" }}
              type="clgId"
              placeholder="Enter rollno / collegeId"
              name="clgId"
              value={clgId}
              onChange={changeHandler}
            />
            <br />
            <br />
            <input
              type="submit"
              className="btn btn-primary px-4 py-2 shadow-sm mb-3"
              value="login"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
