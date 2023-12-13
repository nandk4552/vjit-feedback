import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../headers/AdminHeader";
import AdminFooter from "./Footer";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Spinner from "../components/Spinner";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { BiRefresh, BiSearchAlt2 } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const FacultyReport = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const [teacher, setTeacher] = useState("");
  const [deptsec, setDeptsec] = useState("");
  const [subj, setSubj] = useState("");

  const fetchFaculty = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/count-and-percentage-per-teacher`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFacultyData(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faculty report data:", error);
        setIsLoading(false);
      });
  };

  useEffect(async () => {
    fetchFaculty();
  }, []);
  const handleDownloadPDF = async (faculty) => {
    // const email = faculty.teacheremail
    // const email = localStorage.getItem("email");
    const data = {
      teacherName: faculty.teacherName,
      subject: faculty.subject,
      studentclass: faculty.studentclass,
      totalFeedbackCount: faculty.totalFeedbackCount,
      percentageSubjectKnowledge: faculty.percentageSubjectKnowledge.toFixed(2),
      percentageCommunication: faculty.percentageCommunication.toFixed(2),
      percentagePresentationSkills:
        faculty.percentagePresentationSkills.toFixed(2),
      percentagePunctuality: faculty.percentagePunctuality.toFixed(2),
      percentageControlOverTheClass:
        faculty.percentageControlOverTheClass.toFixed(2),
      percentageAudibility: faculty.percentageAudibility.toFixed(2),
      percentageProfessionalism: faculty.percentageProfessionalism.toFixed(2),
      percentageContentOfLecture: faculty.percentageContentOfLecture.toFixed(2),
      percentageClarificationOfDoubts:
        faculty.percentageClarificationOfDoubts.toFixed(2),
      percentageExplanationWithExamples:
        faculty.percentageExplanationWithExamples.toFixed(2),
      totalPercentage: (
        (faculty.percentagePresentationSkills +
          faculty.percentageExplanationWithExamples +
          faculty.percentageClarificationOfDoubts +
          faculty.percentageContentOfLecture +
          faculty.percentageProfessionalism +
          faculty.percentageAudibility +
          faculty.percentageControlOverTheClass +
          faculty.percentagePunctuality +
          faculty.percentageCommunication +
          faculty.percentageSubjectKnowledge) /
        10
      ).toFixed(2),
    };

    try {
      await axios
        .post(`${process.env.REACT_APP_API}/createpdf`, data)
        .then(async (res) => {
          await axios
            .get(`${process.env.REACT_APP_API}/fetchpdf`, {
              responseType: "blob",
            })
            .then((res) => {
              const pdfBlob = new Blob([res.data], { type: "application/pdf" });
              saveAs(pdfBlob, `facultyReport.pdf`);
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const searchHandler = (e) => {
    e.preventDefault();
    var teacher1 = teacher.toLowerCase();
    var deptsec1 = deptsec.toLowerCase();
    var subj1 = subj.toLowerCase();

    if (!teacher && !deptsec && !subj) {
      fetchFaculty();
    }

    if (teacher && !deptsec && !subj) {
      setFacultyData(
        facultyData?.filter((profile) =>
          profile.teacherName.toLowerCase().includes(teacher1)
        )
      );
    }
    if (!teacher && deptsec && !subj) {
      setFacultyData(
        facultyData?.filter((profile) =>
          profile.studentclass.toLowerCase().includes(deptsec1)
        )
      );
    }
    if (!teacher && !deptsec && subj) {
      setFacultyData(
        facultyData?.filter((profile) =>
          profile.subject.toLowerCase().includes(subj1)
        )
      );
    }
    // for 2 values search
    if (teacher && deptsec && !subj) {
      setFacultyData(
        facultyData?.filter(
          (profile) =>
            profile.teacherName.toLowerCase().includes(teacher1) &&
            profile.studentclass.toLowerCase().includes(deptsec1)
        )
      );
    }

    if (!teacher && deptsec && subj) {
      setFacultyData(
        facultyData?.filter(
          (profile) =>
            profile.studentclass.toLowerCase().includes(deptsec1) &&
            profile.subject.toLowerCase().includes(subj1)
        )
      );
    }
    if (teacher && !deptsec && subj) {
      setFacultyData(
        facultyData?.filter(
          (profile) =>
            profile.teacherName.toLowerCase().includes(teacher1) &&
            profile.subject.toLowerCase().includes(subj1)
        )
      );
    }
    // search for 3 values
    if (teacher && deptsec && subj) {
      setFacultyData(
        facultyData?.filter(
          (profile) =>
            profile.teacherName.toLowerCase().includes(teacher1) &&
            profile.subject.toLowerCase().includes(subj1) &&
            profile.studentclass.toLowerCase().includes(deptsec1)
        )
      );
    }
  };
  const handleRefresh = () => {
    setIsLoading(true);
    setTeacher("");
    setSubj("");
    setDeptsec("");
    fetchFaculty();
    toast.success("Refreshing...");
    setIsLoading(false);
  };
  if (
    !localStorage.getItem("role") ||
    localStorage.getItem("role") !== "admin"
  ) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <AdminHeader />
      <div className="min-vh-100">
        <section className="container">
          <h1 className="app-red mt-4 text-capitalize fw-bolder  text-decoration-underline text-center">
            Faculty Report
          </h1>
          <h5 className="navbar-brand text-center text-secondary">
            Browse and get faculty report <span> 🤝 </span>
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
          {/* Add this button */}
          {facultyData?.length >= 1 && (
            <ReactHTMLTableToExcel
              className="btn btn-success btn-sm"
              table="facultyReportData"
              filename="facultyReportData"
              sheet="sheet"
              buttonText="Export Excel"
            />
          )}

          {isLoading ? (
            <Spinner />
          ) : facultyData?.length >= 1 ? (
            <div className="table-responsive my-3">
              <table className="table" id="facultyReportData">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Download Report</th>
                    <th>Faculty Name</th>

                    <th>Subject</th>
                    <th>Branch</th>
                    <th>Total Feedbacks</th>
                    <th>Subject Knowledge</th>
                    <th>Communication</th>
                    <th>Presentation Skills</th>
                    <th>Punctuality</th>
                    <th>Control Over the Class</th>
                    <th>Audibility</th>
                    <th>Professionalism</th>
                    <th>ContentOfLecture</th>
                    <th>Clarification of Doubts</th>
                    <th>Explanation with Examples</th>
                    <th>Total Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyData?.map((faculty, index) => (
                    <tr key={index}>
                      <td>{(index += 1)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleDownloadPDF(faculty)}
                        >
                          <FaDownload />
                        </button>
                      </td>
                      <td>{faculty.teacherName} </td>

                      <td>{faculty.subject}</td>
                      <td>{faculty.studentclass}</td>
                      <td>{faculty.totalFeedbackCount}</td>
                      <td>
                        {faculty.totalSubjectKnowledgeCount} /{" "}
                        {faculty.percentageSubjectKnowledge.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalCommunicationCount} /{" "}
                        {faculty.percentageCommunication.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalPresentationSkillsCount} /{" "}
                        {faculty.percentagePresentationSkills.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalPunctualityCount}/{" "}
                        {faculty.percentagePunctuality.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalControlOverTheClass}/{" "}
                        {faculty.percentageControlOverTheClass.toFixed(2)}%
                      </td>

                      <td>
                        {faculty.totalAudibility}/{" "}
                        {faculty.percentageAudibility.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalProfessionalism}/{" "}
                        {faculty.percentageProfessionalism.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalContentOfLecture}/{" "}
                        {faculty.percentageContentOfLecture.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalClarificationOfDoubts}/{" "}
                        {faculty.percentageClarificationOfDoubts.toFixed(2)}%
                      </td>
                      <td>
                        {faculty.totalExplanationWithExamples}/{" "}
                        {faculty.percentageExplanationWithExamples.toFixed(2)}%
                      </td>
                      <td>
                        {(
                          (faculty.percentagePresentationSkills +
                            faculty.percentageExplanationWithExamples +
                            faculty.percentageClarificationOfDoubts +
                            faculty.percentageContentOfLecture +
                            faculty.percentageProfessionalism +
                            faculty.percentageAudibility +
                            faculty.percentageControlOverTheClass +
                            faculty.percentagePunctuality +
                            faculty.percentageCommunication +
                            faculty.percentageSubjectKnowledge) /
                          10
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            "No data available"
          )}
        </section>
      </div>
      <AdminFooter />
    </>
  );
};

export default FacultyReport;
