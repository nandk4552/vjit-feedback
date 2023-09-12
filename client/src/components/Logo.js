import React from "react";
import vjit from "./vjit.png";
import clubs from "./clubs.png";
import { Navbar, Container } from "react-bootstrap";
import "../App.css";

const Logo = () => {
  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center border-b">
      <Navbar className="logos">
        <Navbar.Brand href="https://vjit.ac.in" target="_blank">
          <img src={vjit} className="head" alt="vjit" />
        </Navbar.Brand>
        {/* <Navbar.Toggle /> */}
        <Navbar.Brand className="mx-auto">
          <img className="headerclub" src={clubs} alt="clubs" />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default Logo;
