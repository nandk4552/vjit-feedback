import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import AdminHeader from "../headers/AdminHeader";
import "./Dashboard.css";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import AdminFooter from "./Footer";
import { BiRefresh } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        .get(`${process.env.REACT_APP_API}/allfeedbacks`, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching student report data:", error);
          setIsLoading(false);
        });
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
      .get(`${process.env.REACT_APP_API}/allfeedbacks`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllData();
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  if (
    !localStorage.getItem("role") ||
    localStorage.getItem("role") !== "admin"
  ) {
    return <Navigate to="/login" />;
  }
  const handleRefresh = () => {
    setIsLoading(true);
    setTeacher("");
    setSubj("");
    setDeptsec("");
    getAllData();
    toast.success("Refreshing...");
    setIsLoading(false);
  };

  return (
    <div>
      <AdminHeader />

      <section className="container">
        <h1 className="app-red mt-4 text-capitalize fw-bold text-decoration-underline text-center">
          Admin Dashboard
        </h1>

        <h5 className="navbar-brand text-center text-secondary">
          Browse and find student feedback <span> 🤝 </span>
        </h5>
        <form
          onSubmit={searchHandler}
          className=" rounded border p-2 d-lg-flex align-items-center justify-content-left"
        >
          <div className="d-lg-block d-flex flex-column">
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="Teacher"
              aria-label="Search"
              className="m-1 rounded shadow-sm border p-1"
            />
            <input
              type="text"
              value={deptsec}
              onChange={(e) => setDeptsec(e.target.value)}
              placeholder="dept section "
              aria-label="Search"
              className="m-1 rounded shadow-sm border p-1"
            />
            <input
              type="text"
              value={subj}
              onChange={(e) => setSubj(e.target.value)}
              placeholder="subject"
              aria-label="Search"
              className="m-1 rounded shadow-sm border p-1 "
            />
          </div>

          <div className="mx-1 my-2 d-flex align-items-center justify-content-left">
            <div className="bg-danger border-success px-1 rounded">
              <input
                className="btn-sm btn-danger"
                type="submit"
                value={`Search`}
              />
              <BiSearchAlt2 className="ms-1 text-light" />
            </div>
            <button
              className="btn-sm btn-primary mx-2 btn-blue"
              onClick={handleRefresh}
            >
              Refresh
              <BiRefresh className="ms-1" />
            </button>
          </div>
        </form>
        <br />

        <h5 className="text-capitalize">
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
        </h5>
        {/* if datat is there show export button else null */}

        {data.length >= 1 ? (
          <ReactHTMLTableToExcel
            className="btn btn-success btn-sm "
            table="stocksData"
            filename="reportexcel"
            sheet="sheet"
            buttonText="Export excel"
          />
        ) : null}

        {isLoading ? (
          <Spinner />
        ) : data.length >= 1 ? (
          <center>
            <div className="table-responsive my-3">
              <table className="table" id="stocksData">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
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
            </div>
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
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;
