import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import UserHeader from "../headers/UserHeader";
import toast from "react-hot-toast";
import Logo from "./Logo";

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [data, seData] = useState({
    collegeId: "",
    password: "",
  });
  const { collegeId, password } = data;

  const changeHandler = (e) => {
    seData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API}/login`, data).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "user");
        localStorage.setItem("dept", res.data.id);
        setAuth(true);
        toast.success("Login Successfully...!");
      } else {
        toast.error(res.data);
      }
    });
  };

  if (auth) {
    return <Navigate to="/instructions" />;
  }

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("role") === "user"
  ) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="con">
      <Logo />

      <div className="box shadow">
        <section className="container">
          <h1
            className="large text-uppercase fw-bold py-2 app-red"
            style={{
              color: "orange",
              marginTop: "100px",
              marginBottom: "1rem",
            }}
          >
            Sign In
          </h1>
          <p className="lead text-secondary fst-italic">
            <b>Sign into feedback portal</b>
          </p>
          <form onSubmit={submitHandler} className="container">
            <input
              className="form-control-lg mb-1 border"
              style={{ width: "60%" }}
              type="collegeId"
              placeholder="Enter rollno / collegeId"
              name="collegeId"
              value={collegeId}
              onChange={changeHandler}
            />
            <br />
            <br />
            <input
              className="form-control-lg mb-1 border"
              style={{ width: "60%" }}
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={changeHandler}
            />

            <br />
            <br />
            <input
              type="submit"
              className="btn btn-primary btn-blue px-4 py-2 shadow-sm mb-3"
              value="login"
            />
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
