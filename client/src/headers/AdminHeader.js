import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
const AdminHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand display-6 fw-bolder text-uppercase orange"
            to="/adminDashboard"
          >
            Feedback Portal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/adminDashboard"
                  className="nav-link text-capitalize"
                  style={({ isActive }) => ({
                    color: isActive ? "orange" : "white",
                  })}
                >
                  Complete feedback info
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admincontact"
                  className="nav-link text-capitalize"
                  style={({ isActive }) => ({
                    color: isActive ? "orange" : "white",
                  })}
                >
                  contact us
                </NavLink>
              </li>
            </ul>
            <span className="navbar-text">
              <Link
                to="/login"
                onClick={() => localStorage.clear()}
                className="btn-sm btn-danger text-white text-decoration-none px-3 py-2 fw-normal"
              >
                Logout
                <FiLogOut className="ms-2" />
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminHeader;
