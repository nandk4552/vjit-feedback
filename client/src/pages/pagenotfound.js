import React from "react";
import { Link } from "react-router-dom";
import "./styles/Pagenotfound.css";
import Logo from "../components/Logo";
import Footer from "../privatecomponents/Footer";
const Pagenotfound = () => {
  return (
    <>
      <Logo />
      <div className="pnf">
        <h1 className="pnf-title mb-0">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Pagenotfound;
