import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Logo from "./Logo";
import { BiUser } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
const Home = () => {
  return (
    <div className="img">
      <center>
        <Logo />
        <div className="hom shadow">
          <section style={{ marginTop: "170px" }}>
            <h1
              className="text-capitalize fw-bold"
              style={{ paddingTop: "2rem" }}
            >
              VJIT feedback portal
            </h1>
            <p className="home-base text-secondary fw-bold">
              create a student profile and feedback on your teachers
            </p>
            <Link to="/admin" className="btn btn-primary text-center">
              <RiAdminLine className="me-1" />
              Admin
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/login" className="btn btn-success text-center">
              <BiUser className="me-1" />
              Login
            </Link>
          </section>
        </div>
      </center>
    </div>
  );
};

export default Home;
