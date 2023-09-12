import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { VscFeedback } from "react-icons/vsc";
import Header from "../headers/Header";
import "./Dashboard.css";
import Footer from "./Footer";

const Dashboard = () => {
  const [data, setDataa] = useState([]);
  useEffect(() => {
    console.log(localStorage.getItem("dept"));
    axios
      .post(`${process.env.REACT_APP_API}/getAllTeachers2`, {
        dept: localStorage.getItem("dept"),
      })
      .then((res) => setDataa(res.data));
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <section className="container">
        <nav className="navbar navbar-light mt-3">
          <div className="container-fluid">
            <h5 className="navbar-brand text-capitalize fw-bold text-secondary">
              Browse and give your feedback{" "}
            </h5>
          </div>
        </nav>
        <div className="container mb-5">
          <div className="row g-1">
            {data.length >= 1 ? (
              data.map((profile, index) => (
                <div className="col-md-4" key={index}>
                  <div
                    className="card shadow-sm p-2"
                    style={{ width: "20rem" }}
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h4 className="card-title"> {profile.teacherName}</h4>
                      <p>
                        <span className="fw-bold orange">Mobile No: </span>
                        {profile.teachermob}
                      </p>
                      <p>
                        <span className="fw-bold orange text-truncate">
                          Email:{" "}
                        </span>
                        {profile.teacheremail}
                      </p>
                      <p className="card-text fw-bold">
                        <span className="fw-bold orange">Subject: </span>
                        {profile.subject}
                      </p>
                      <Link
                        to={`/feedback/${profile.teacherName}/${profile._id}`}
                        className="btn btn-primary"
                      >
                        Feedback
                        <VscFeedback className="mb-1 ms-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4>Loading...</h4>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
