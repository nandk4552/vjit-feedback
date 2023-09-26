import React, { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../headers/Header";
import "./Dashboard.css";
import toast from "react-hot-toast";
import Footer from "./Footer";

const Feedback = () => {
  const { tname, tid } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [matched, setMatched] = useState(false);
  const [navi, setNavi] = useState(false);

  const [rating, setRating] = useState({
    subjectKnowledge: "",
    communication: "",
    presentationSkills: "",
    punctuality: "",
    controlOverTheClass: "",
    audibility: "",
    professionalism: "",
    contentOfLecture: "",
    clarificationOfDoubts: "",
    explanationWithExamples: "",
    comment: "",
    teacherName: tname,
    teacherrefid: tid,
    deptclass: localStorage.getItem("dept"),
  });
  const {
    subjectKnowledge,
    communication,
    presentationSkills,
    punctuality,
    controlOverTheClass,
    audibility,
    professionalism,
    contentOfLecture,
    clarificationOfDoubts,
    explanationWithExamples,
    comment,
  } = rating;

  useEffect(() => {
    // console.log(localStorage.getItem("dept"));
    axios
      .get(`${process.env.REACT_APP_API}/checkrelation/${tid}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data === "relation") {
          setMatched(true);
        }

        axios
          .get(`${process.env.REACT_APP_API}/findteacher/${tid}`)
          .then((res) => setData(res.data));
      });
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      subjectKnowledge &&
      communication &&
      presentationSkills &&
      punctuality &&
      controlOverTheClass &&
      audibility &&
      professionalism &&
      contentOfLecture &&
      clarificationOfDoubts &&
      explanationWithExamples
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/comment/${data.subject}`, rating, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => toast.success(res.data.message));

      setNavi(true);
    } else {
      toast.error("fill complete info..!");
    }
  };

  if (navi) {
    navigate("/Dashboard", { replace: true });
    window.location.reload();
    return null;
  }

  const Handler = (e) => {
    setRating({ ...rating, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />

      <section className="container my-3 mt-5 min-vh-100">
        <div className="profiles">
          <center>
            <img
              className="round-img"
              src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
              height="100"
              width="150"
              alt="userPhoto"
            />

            <div>
              <h2 className="app-red fw-bold">{data.teacherName}</h2>
              <h3>{data.Department}</h3>
              <p>{data.teachermob}</p>
              <p>{data.teacheremail}</p>
              <h1>
                <b>{data.subject}</b>
              </h1>
            </div>

            <p>
              10-Excellent 9-Extremely Good 8-Very Good 7-Good 6-Moderately Good
              5-Moderate 4-Tolerable 3-Poor 2-Very Poor 1-Extremely Poor <br />
            </p>

            <div
              className="row"
              style={{ borderStyle: "solid", padding: "20px" }}
            >
              <div className="col-md-6">
                {!matched ? (
                  <div>
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Subject Knowledge :
                    </h5>
                    &nbsp;&nbsp;
                    <select name="subjectKnowledge" id="s1" onChange={Handler}>
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Communication :
                    </h5>
                    &nbsp;&nbsp;
                    <select name="communication" id="s2" onChange={Handler}>
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Presentation Skills :
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="presentationSkills"
                      id="s3"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Punctuality :
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="punctuality"
                      id="s4"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Control Over The Class :
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="controlOverTheClass"
                      id="s5"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                  </div>
                ) : null}
              </div>

              <div className="col-md-6">
                {!matched ? (
                  <div>
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Audibility:
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="audibility"
                      id="s6"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Professionalism :
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="professionalism"
                      id="s7"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Content Of Lecture :
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="contentOfLecture"
                      id="s8"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Clarification Of Doubts :
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="clarificationOfDoubts"
                      id="s9"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <br />
                    <br />
                    <h5 style={{ textAlign: "justify", display: "inline" }}>
                      Explanation With Examples :
                    </h5>
                    &nbsp;&nbsp;
                    <select
                      name="explanationWithExamples"
                      id="s10"
                      onChange={Handler}
                      style={{ display: "inline-block" }}
                    >
                      <option value="">Select</option>
                      <option value="10">10</option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                ) : null}
              </div>
            </div>
            <br />
            <br />
          </center>
        </div>

        {!matched ? (
          <div>
            <div className="form-group">
              <label htmlFor="comment">
                <h4>
                  Comment: <small>( Max : 100 characters )</small>
                </h4>
              </label>
              <textarea
                className="form-control"
                placeholder="feedback on this teacher"
                rows="3"
                onChange={Handler}
                name="comment"
                id="comment"
              ></textarea>
            </div>
            <br />
            <center>
              <input
                type="submit"
                onClick={submitHandler}
                className="btn btn-success btn-blue"
                value="submit feedback"
              />
            </center>
            <br />
            <br />
          </div>
        ) : (
          <h1 style={{ textAlign: "center" }}>
            Sorry, You have already given feedback to this profile
          </h1>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Feedback;
