import React, { useState } from "react";
import "./Styles1.css";
import { Link, Navigate } from "react-router-dom";

import vjitlogo from "./v1.png";

const Instructions = () => {
  const [isChecked, setIsChecked] = useState(false);
  if (
    !localStorage.getItem("role") ||
    localStorage.getItem("role") !== "user"
  ) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="background-style p-3">
      <div className="">
        <div className="container d-flex align-items-center justify-content-center">
          <img className="logo" src={vjitlogo} alt="" />
        </div>

        <div className="instructions-container">
          <div>
            <h1 className="display-5 text-center  text-danger fw-bold text-decoration-underline">
              Important Instructions!{" "}
            </h1>
            <h1 className="fs-3 text-danger text-capitalize">
              Read Carefully before Giving Your Valuable Feedback
            </h1>
            <h4 className="text-capitalize fs-5">
              Please Provide Honest Feedback to improve the Quality of Education
            </h4>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">👤</span>
            <p className="">
              You are Anonymous to us, Feel Free to Give Genuine Feedback
            </p>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">🎯</span>
            <p>
              Score Each Faculty on a scale of 1 to 10 for each Attribute listed
              in the Header
            </p>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">🌟</span>
            <p className="">
              10-Excellent, 9-Extremely Good, 8-Very Good, 7-Good, 6-Moderately
              Good, 5-Moderate, 4-Tolerable, 3-Poor, 2-Very Poor, 1-Extremely
              Poor
            </p>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">⚠️</span>
            <p>All the fields are Mandatory</p>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">📝</span>
            <p>
              Comment Section is not mandatory but any sort of misuse will be
              traced out
            </p>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">📥</span>
            <p>After filling all the fields, press submit</p>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">❌</span>
            <p>
              In case you don't submit or press exit, you will have to choose
              all the fields again
            </p>
          </div>
          <div className="instructions-item">
            <span className="instructions-icon">🚫</span>
            <p>
              Once you give your feedback, you won't be able to give your
              feedback again
            </p>
          </div>
          <div className="form-check mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label className="form-check-label">
              I have read and understood the instructions.
            </label>
          </div>
          <Link
            to="/dashboard"
            className={`btn btn-success ${!isChecked ? "disabled" : ""}`}
            disabled={!isChecked}
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
