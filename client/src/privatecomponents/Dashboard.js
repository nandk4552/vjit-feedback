import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { VscFeedback } from "react-icons/vsc";
import { TiTick } from "react-icons/ti";
import Header from "../headers/Header";
import "./Dashboard.css";
import Footer from "./Footer";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [feedbackGiven, setFeedbackGiven] = useState({});
  const [data, setDataa] = useState([]);
  useEffect(() => {
    console.log(localStorage.getItem("dept"));
    axios
      .post(`${process.env.REACT_APP_API}/getAllTeachers2`, {
        dept: localStorage.getItem("dept"),
      })
      .then((res) => {
        setDataa(res.data);
        const teachers = res.data;
        teachers.forEach((profile) => {
          checkFeedbackStatus(profile._id);
        });
      });
  }, []);

  const checkFeedbackStatus = (teacherId) => {
    // Make the axios request to check feedback status
    axios
      .get(`${process.env.REACT_APP_API}/checkrelation/${teacherId}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data === "relation") {
          setFeedbackGiven((prevFeedbackGiven) => ({
            ...prevFeedbackGiven,
            [teacherId]: true,
          }));
        }
      })
      .catch((error) => {
        console.error("Error checking feedback status:", error);
      });
  };

  console.log(data);
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
                  <div className="card shadow p-2" style={{ width: "20rem" }}>
                    <img
                      src="https://ik.imagekit.io/fhe9c5aen/VJIT_feedback_form/A_5sZqpR7Lz.png?updatedAt=1695711150847"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h4 className="card-title"> {profile.teacherName}</h4>
                      <p className="card-text fw-bold">
                        <span className="fw-bold text-danger text-truncate">
                          Department:{" "}
                        </span>
                        {profile.teacherDepartment}
                      </p>
                      <p className="card-text fw-bold">
                        <span className="fw-bold text-danger">Subject: </span>
                        {profile.subject}
                      </p>
                      {feedbackGiven[profile._id] ? (
                        <button
                          disabled
                          className="btn btn-success disabled shadow"
                        >
                          Feedback given
                          <TiTick className="mb-1 ms-1" />
                        </button>
                      ) : (
                        <Link
                          to={`/feedback/${profile.teacherName}/${profile._id}`}
                          className="btn btn-primary btn-blue shadow"
                        >
                          Feedback
                          <VscFeedback className="mb-1 ms-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
