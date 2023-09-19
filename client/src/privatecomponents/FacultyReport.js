import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../headers/AdminHeader";
import AdminFooter from "./Footer";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Spinner from "../components/Spinner";

const FacultyReport = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    // Fetch faculty report data from your API
    await axios
      .get(`${process.env.REACT_APP_API}/count-and-percentage-per-teacher`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFacultyData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faculty report data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="min-vh-100">
        <section className="container">
          <h1 className="app-red mt-4 text-capitalize fw-bolder  text-decoration-underline text-center">
            Faculty Report
          </h1>

          {facultyData.length >= 1 && (
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
          ) : facultyData.length >= 1 ? (
            <div className="table-responsive my-3">
              <table className="table" id="facultyReportData">
                <thead>
                  <tr>
                    <th>S.no</th>
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
                    <th>Clarification of Doubts</th>
                    <th>Explanation with Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyData.map((faculty, index) => (
                    <tr key={index}>
                      <td>{(index += 1)}</td>
                      <td>{faculty.teacherName}</td>
                      <td>{faculty.subject}</td>
                      <td>{faculty.studentclass}</td>
                      <td>{faculty.totalFeedbackCount}</td>
                      <td>
                        {faculty.totalSubjectKnowledgeCount} /{" "}
                        {faculty.percentageSubjectKnowledge.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalCommunicationCount} /{" "}
                        {faculty.percentageCommunication.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalPunctualityCount}/{" "}
                        {faculty.percentagePunctuality.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalControlOverTheClass}/{" "}
                        {faculty.percentageControlOverTheClass.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalAudibility}/{" "}
                        {faculty.percentageAudibility.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalProfessionalism}/{" "}
                        {faculty.percentageProfessionalism.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalContentOfLecture}/{" "}
                        {faculty.percentageContentOfLecture.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalClarificationOfDoubts}/{" "}
                        {faculty.percentageClarificationOfDoubts.toFixed(1)} %
                      </td>
                      <td>
                        {faculty.totalExplanationWithExamples}/{" "}
                        {faculty.percentageExplanationWithExamples.toFixed(1)} %
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
