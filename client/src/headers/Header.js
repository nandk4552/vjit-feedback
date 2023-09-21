import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully...!");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-blue p-3">
        <div className="container-fluid">
          <Link
            className="navbar-brand display-6 fw-bolder text-uppercase orange"
            to="/Dashboard"
          >
            VJIT Feedback Portal
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
                  to="/Dashboard"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "white",
                  })}
                >
                  Feedback
                </NavLink>
              </li>

              <li className="nav-item ">
                <NavLink
                  to="/myprofile"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "white",
                  })}
                >
                  My Profile
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "white",
                  })}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <span className="navbar-text">
              <Link
                to="/login"
                onClick={handleLogout}
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

export default Header;
