import React, { useEffect, useState } from "react";
import Header from "../headers/Header";

import axios from "axios";
import { BsLinkedin } from "react-icons/bs";
import Footer from "./Footer";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const Contact = () => {
  const [supportteam, setSupportteam] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/getsupportteam`)
      .then((res) => setSupportteam(res.data));
  }, []);
  if (
    !localStorage.getItem("token") ||
    !localStorage.getItem("role") ||
    localStorage.getItem("role") !== "user"
  ) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Header />
      <section className="container">
        <h1 className="text-danger mt-4 text-uppercase fw-bold text-decoration-underline text-center">
          Supporting Team
        </h1>
        <p className="navbar-brand fw-normal text-center text-secondary fw-normal">
          Contact us for any queries
        </p>
        <div className="container my-4 d-flex align-items-center justify-content-center">
          {supportteam.length >= 1 ? (
            supportteam.map((profile, index) => (
              <div className="card shadow-md" style={{ width: "20rem" }}>
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png  "
                  className="card-img-top p-3"
                  alt="..."
                />
                <div className="card-body">
                  <h3 className="card-title fw-bold">{profile.name}</h3>

                  <p className="text-capitalize lead">{profile.position}</p>
                  <p>
                    <span className="fw-bold">College ID:</span> {profile.clgid}
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Mobile : </span>
                    {profile.mobile}
                  </p>
                  <p>
                    <span className="fw-bold">Email : </span>
                    {profile.email}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/nandk4552/"
                    className="btn-sm btn-primary text-decoration-none"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <BsLinkedin />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
