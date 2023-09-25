const pdf = require("html-pdf");
const path = require("path");
const pdftemplate = require("../documents/documents");
const nodemailer = require("nodemailer");
const fs = require("fs");
const env = require("dotenv");
env.config();

//** create faculty pdf report */
exports.createpdf = (req, res) => {
  pdf
    .create(pdftemplate(req.body, {}), { timeout: 20000 })
    .toFile("facultyReport.pdf", (err) => {
      if (err) {
        console.log(err);
      }
      res.send("faculty report pdf generated");
    });
};

//** Fetch faculty pdf report */
exports.fetchpdf = (req, res) => {
  const pdfPath = path.join(__dirname, "..", "facultyReport.pdf");

  res.sendFile(pdfPath);
};

// ** to validate the recipient email
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

//** Send faculty pdf report */
exports.sendpdf = (req, res) => {
  const recipientEmail = req.body.email;
  if (!recipientEmail) {
    return res.status(400).send("Recipient email is missing.");
  }
  if (!isValidEmail(recipientEmail)) {
    return res.status(400).send("Invalid recipient email.");
  }
  const pathToAttachment = path.join(__dirname, "..", "facultyReport.pdf");
  if (!fs.existsSync(pathToAttachment)) {
    return res.status(404).send("facultyReport PDF file not found.");
  }
  const attachment = fs.readFileSync(pathToAttachment);

  let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: "Faculty Report - VJIT Feedback Portal",
    html: `
        Faculty Report PDF Document, Thanks for being patient.
    `,
    attachments: [
      {
        content: attachment,
        filename: "facultyReport.pdf",
        type: "application/pdf",
        contentDisposition: "attachment",
      },
    ],
  };
  smtpTransport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("faculty report has been sent to your mail successfully.");
    }
  });
};
