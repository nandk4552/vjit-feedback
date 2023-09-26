import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import Header from "../headers/Header";
import "./Myprofile.css";
import Footer from "./Footer";
import Spinner from "../components/Spinner";

const Myprofile = () => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState("");
  const [given, setGiven] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/myprofile`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      });

    axios
      .get(`${process.env.REACT_APP_API}/nooftotalfeedbacks`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTotal(res.data.length);
      });

    axios
      .get(`${process.env.REACT_APP_API}/noofgivenfeedbacks`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setGiven(res.data.length);
      });
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

      <h1 className="text-danger mt-4  fw-bold text-decoration-underline text-center text-uppercase">
        My Profile{" "}
      </h1>

      <div className="container d-flex align-items-center justify-content-center my-3 ">
        {data ? (
          <div className="card shadow-sm p-3" style={{ width: "28rem" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
              className="card-img-top"
              alt="user"
            />
            <div className="card-body">
              <h3 className="card-title fw-bold">{data.fullname}</h3>
              <p className="card-text fs-5">
                <span className="fw-bold app-red">Roll No: </span>
                {data.collegeId}
              </p>
              <p className="card-text fs-5 ">
                <span className="fw-bold app-red">Year: </span>
                {data.branch.split(" ")[0]} yr
              </p>
              <p className="card-text fs-5 ">
                <span className="fw-bold app-red">Branch: </span>
                {data.branch.split(" ")[1]} {data.branch.split(" ")[2]}
              </p>
              <h5 className="card-text fs-5">
                Number of feedbacks exists :{" "}
                <span className="fs-2 fw-bolder ">{total - given}</span>
              </h5>
              <h5 className="card-text fs-5">
                Number of feedbacks given :{" "}
                <span className="fs-2 fw-bolder ">{given}</span>
              </h5>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Myprofile;
