import React from "react";
import vjit from "./vjit.png";
import clubs from "./clubs.png";
import { Navbar, Container } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center border-b">
      <Navbar className="logos">
        <Link to="/">
          <img src={vjit} className="head ms-5" alt="vjit" />
        </Link>
        {/* <Navbar.Toggle /> */}
        <Navbar.Brand className="mx-auto">
          <img className="headerclub" src={clubs} alt="clubs" />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default Logo;
