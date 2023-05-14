import React from "react";
import { NavLink } from "react-router-dom";

const AdminHeader = () => {
  return (
    <nav
      className="navbar bg-dark justify-content-center"
      style={{ backgroundColor: "grey" }}
    >
      <li className="nav-link ">
        <NavLink
          to="/adminDashboard"
          className="nav-link"
          style={({ isActive }) => ({ color: isActive ? "orange" : "white" })}
        >
          Complete feedback info
        </NavLink>
      </li>

      <li className="nav-link">
        <NavLink
          to="/admincontact"
          className="nav-link"
          style={({ isActive }) => ({ color: isActive ? "orange" : "white" })}
        >
          contact us
        </NavLink>
      </li>

      <li className="nav-link">
        <NavLink
          to="/login"
          onClick={() => localStorage.clear()}
          style={{ textDecoration: "none" }}
        >
          Logout
        </NavLink>
      </li>
    </nav>
  );
};

export default AdminHeader;
