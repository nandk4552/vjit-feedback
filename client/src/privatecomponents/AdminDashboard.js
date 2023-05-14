import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import AdminHeader from "../headers/AdminHeader";
import "./Dashboard.css";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  const [teacher, setTeacher] = useState("");
  const [deptsec, setDeptsec] = useState("");
  const [subj, setSubj] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    var teacher1 = teacher.toLowerCase();
    var deptsec1 = deptsec.toLowerCase();
    var subj1 = subj.toLowerCase();

    if (!teacher && !deptsec && !subj) {
      axios
        .get("http://localhost:5000/allfeedbacks", {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => setData(res.data));
    }

    if (teacher && !deptsec && !subj) {
      setData(
        data.filter((profile) =>
          profile.teacherName.toLowerCase().includes(teacher1)
        )
      );
    }
    if (!teacher && deptsec && !subj) {
      setData(
        data.filter((profile) =>
          profile.studentclass.toLowerCase().includes(deptsec1)
        )
      );
    }
    if (!teacher && !deptsec && subj) {
      setData(
        data.filter((profile) => profile.subject.toLowerCase().includes(subj1))
      );
    }
    // for 2 values search
    if (teacher && deptsec && !subj) {
      setData(
        data.filter(
          (profile) =>
            profile.teacherName.toLowerCase().includes(teacher1) &&
            profile.studentclass.toLowerCase().includes(deptsec1)
        )
      );
    }

    if (!teacher && deptsec && subj) {
      setData(
        data.filter(
          (profile) =>
            profile.studentclass.toLowerCase().includes(deptsec1) &&
            profile.subject.toLowerCase().includes(subj1)
        )
      );
    }
    if (teacher && !deptsec && subj) {
      setData(
        data.filter(
          (profile) =>
            profile.teacherName.toLowerCase().includes(teacher1) &&
            profile.subject.toLowerCase().includes(subj1)
        )
      );
    }
    // search for 3 values
    if (teacher && deptsec && subj) {
      setData(
        data.filter(
          (profile) =>
            profile.teacherName.toLowerCase().includes(teacher1) &&
            profile.subject.toLowerCase().includes(subj1) &&
            profile.studentclass.toLowerCase().includes(deptsec1)
        )
      );
    }
  };
  const getAllData = async () => {
    await axios
      .get("http://localhost:5000/allfeedbacks", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getAllData();
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  const handleRefresh = () => {
    setTeacher("");
    setSubj("");
    setDeptsec("");
    getAllData();
  };
  return (
    <div>
      <AdminHeader />

      <section className="container">
        <h1 className="large " style={{ color: "orange", marginTop: "20px" }}>
          feedback portal
        </h1>

        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <h5 className="navbar-brand">
              Browse and find student feedback{" "}
              <span style={{ color: "blue" }}> 🤝 </span>
            </h5>
          </div>
        </nav>

        <form onSubmit={searchHandler}>
          <input
            type="text"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            placeholder="Teacher "
            aria-label="Search"
          />
          &nbsp;&nbsp;&nbsp;
          <input
            type="text"
            value={deptsec}
            onChange={(e) => setDeptsec(e.target.value)}
            placeholder="dept section "
            aria-label="Search"
          />
          &nbsp;&nbsp;&nbsp;
          <input
            type="text"
            value={subj}
            onChange={(e) => setSubj(e.target.value)}
            placeholder="subject"
            aria-label="Search"
          />
          &nbsp;&nbsp;&nbsp;
          <input
            className="btn btn-outline-success"
            type="submit"
            value="search"
          />
          <button className="btn btn-primary mx-2" onClick={handleRefresh}>
            refresh
          </button>
        </form>
        <br />

        <h1>
          Total Student profiles :{" "}
          <span style={{ color: "red" }}>
            {
              [
                ...new Set(
                  data.map((obj) => {
                    return obj.studentclgId;
                  })
                ),
              ].length
            }
          </span>
        </h1>
        {/* if datat is there show export button else null */}
        {data.length >= 1 ? (
          <ReactHTMLTableToExcel
            className="btn btn-success"
            table="stocksData"
            filename="reportexcel"
            sheet="sheet"
            buttonText="Export excel"
          />
        ) : null}

        {data.length >= 1 ? (
          <center>
            <table className="table" id="stocksData">
              <thead>
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Dept</th>
                  {/* <th scope="col">Student</th>
                        <th scope="col">ClgID</th> */}
                  <th scope="col">Subject</th>

                  <th scope="col">subjectKnowledge </th>
                  <th scope="col">communication</th>
                  <th scope="col">presentationSkills</th>
                  <th scope="col">punctuality</th>
                  <th scope="col">controlOverTheClass</th>
                  <th scope="col">audibility</th>

                  <th scope="col">professionalism</th>
                  <th scope="col">contentOfLecture</th>
                  <th scope="col">clarificationOfDoubts</th>
                  <th scope="col">explanationWithExamples</th>
                  <th scope="col">Comment</th>
                </tr>
              </thead>
              <tbody>
                {data.map((singleitem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{singleitem.teacherName}</td>
                    <td>{singleitem.studentclass}</td>
                    {/* <td>{singleitem.studentName}</td>
                        <td>{singleitem.studentclgId}</td> */}
                    <td>{singleitem.subject}</td>

                    <td>{singleitem.subjectKnowledge}</td>
                    <td>{singleitem.communication}</td>
                    <td>{singleitem.presentationSkills}</td>
                    <td>{singleitem.punctuality}</td>
                    <td>{singleitem.controlOverTheClass}</td>

                    <td>{singleitem.audibility}</td>
                    <td>{singleitem.professionalism}</td>
                    <td>{singleitem.contentOfLecture}</td>
                    <td>{singleitem.clarificationOfDoubts}</td>
                    <td>{singleitem.explanationWithExamples}</td>
                    <td>{singleitem.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        ) : (
          <h4>Search with valid fields</h4>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>
    </div>
  );
};

export default AdminDashboard;
