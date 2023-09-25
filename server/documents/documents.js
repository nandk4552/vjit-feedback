module.exports = ({
  teacherName,
  subject,
  studentclass,
  totalFeedbackCount,
  percentageSubjectKnowledge,
  percentageCommunication,
  percentagePresentationSkills,
  percentagePunctuality,
  percentageControlOverTheClass,
  percentageAudibility,
  percentageProfessionalism,
  percentageContentOfLecture,
  percentageClarificationOfDoubts,
  percentageExplanationWithExamples,
  totalPercentage,
}) => {
  const today = new Date();
  return `
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Faculty PDF Report | VJIT Feedbak Portal</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />

    <style>
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica";
        color: #555;
      }
      .margin-top {
        margin-top: 50px;
      }
      .justify-center {
        text-align: center;
      }
      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
      }
      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }
      .invoice-box table tr td:nth-child(2) {
        text-align: right;
      }
      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }
      .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }
      .invoice-box table tr.information table td {
        padding-bottom: 0.1rem;
      }
      .invoice-box table tr.title table td {
        padding-bottom: 2rem;
        font-size: 2rem;
        color: #555;
        text-decoration: underline;
        font-weight: 600;
      }
      .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }
      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }
      .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
      }
      .invoice-box table tr.item.last td {
        border-bottom: none;
      }
      .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
      }
      .credits {
        font-size: 0.9rem;
        text-align: center;
        color: #555;
        border-bottom: 1px solid #555;
        padding: 5px 0;
      }
      .footer-credits {
        font-size: 0.9rem;
        text-align: center;
        color: #555;
        border-top: 1px solid #555;
        padding: 5px 0;
      }
      .signature {
        margin-top: 2.5rem;
        text-align: right;
      }
      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }
        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title pb-0">
                  <img
                    src="https://ik.imagekit.io/fhe9c5aen/VJIT_feedback_form/VJIT_logo_2023_WqQY0QfuK.png?updatedAt=1684432890016"
                    style="width: 100%; max-width: 200px"
                  />
                </td>
                <td class="pb-0">
                  VJIT FEEDBACK PORTAL
                  <br />
                  Date of Report: ${`${today.getDate()}/${
                    today.getMonth() + 1
                  }/${today.getFullYear()}`}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="top">
          <td colspan="2">
            <p class="credits">
              [ Accredited by NAAC & NBA, Approved by AICTE New Delhi &
              Permanently Affiliated to JNTUH ]
            </p>
          </td>
        </tr>

        <tr class="title">
          <td colspan="2">
            <table>
              <tr>
                <td class="text-center">Faculty Report</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="information pb-0">
          <td colspan="2">
            <table>
              <tr>
                <td><span class="fw-bold">Department:</span> ${studentclass}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table>
              <tr>
                <td class="pb-3">
                  <span class="fw-bold">Faculty Name:</span> ${teacherName}
                </td>
                <td class="pb-3">
                  <span class="fw-bold">Subject:</span> ${subject}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="heading">
          <td>No of Feedbacks Received:</td>
          <td>${totalFeedbackCount}</td>
        </tr>
        <tr class="item">
          <td>Subject Knowledge:</td>
          <td>${percentageSubjectKnowledge}%</td>
        </tr>
        <tr class="item">
          <td>Communication:</td>
          <td>${percentageCommunication}%</td>
        </tr>
        <tr class="item">
          <td>Presentation Skills:</td>
          <td>${percentagePresentationSkills}%</td>
        </tr>
         <tr class="item">
          <td>ContentOfLecture:</td>
          <td>${percentageContentOfLecture}%</td>
        </tr>
        <tr class="item">
          <td>Punctuality:</td>
          <td>${percentagePunctuality}%</td>
        </tr>
        <tr class="item">
          <td>Control Over the Class:</td>
          <td>${percentageControlOverTheClass}%</td>
        </tr>
        <tr class="item">
          <td>Audibility:</td>
          <td>${percentageAudibility}%</td>
        </tr>
        <tr class="item">
          <td>Professionalism:</td>
          <td>${percentageProfessionalism}%</td>
        </tr>
        <tr class="item">
          <td>Clarification of Doubts:</td>
          <td>${percentageClarificationOfDoubts}%</td>
        </tr>

        <tr class="item">
          <td>Explanation with Examples:</td>
          <td>${percentageExplanationWithExamples}%</td>
        </tr>
        <tr class="heading">
          <td>Total Percentage</td>
          <td>${totalPercentage}%</td>
        </tr>
      </table>

      <br />
      <p class="signature text-uppercase">principal</p>
      <footer>
        <tr class="top">
          <td colspan="2">
            <p class="footer-credits">
              Aziznagar gate, Chilkur Balaji Road, Hyderabad - 500 075. Phone:
              +91 73 73 637 637 | www.vjii.ac.in
            </p>
          </td>
        </tr>
      </footer>
    </div>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>
  </body>
</html>

    `;
};
