import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
const userHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          className="navbar-brand display-6 fw-bolder text-uppercase orange"
          to="/"
        >
          Feedback Portal
        </Link>
        <span className="navbar-text d-flex align-items-center justify-content-center">
          <Link
            to="/admin"
            onClick={() => localStorage.clear()}
            className="btn-sm btn-warning text-dark text-decoration-none px-3 py-2 "
          >
            <RiAdminLine className="me-1" />
            Admin Login
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default userHeader;
