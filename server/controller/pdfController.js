const puppeteer = require("puppeteer");
const path = require("path");
const pdftemplate = require("../documents/documents");
const nodemailer = require("nodemailer");
const fs = require("fs");
const env = require("dotenv");
env.config();

//** create faculty pdf report */
exports.createpdf = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        "--disable-site-isolation-trials",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });
    const page = await browser.newPage();

    // Generate HTML content for the PDF using your pdftemplate function
    const content = pdftemplate(req.body, {});

    await page.setContent(content);

    // Generate PDF
    await page.pdf({
      path: path.join(__dirname, "..", `facultyReport.pdf`), // Include faculty name in the PDF filename
      format: "A4",
    });

    await browser.close();

    res.send("Faculty report PDF generated");
  } catch (err) {
    console.error("Error in creating PDF", err);
    res.status(500).send("Internal Server Error");
  }
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
