const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const dotenv = require("dotenv");
const sendEmail = require("./sendmail");
const crypto = require("crypto");
const pdfRoutes = require("./routes/pdfRoutes");
////
const path = require("path");
const users = require("./usermodel"); //students in college
const adminloginmodel = require("./adminloginmodel");
const demomodel = require("./demo");
const teachersmodel = require("./teachersmodel");
const feedbackmodel = require("./feedbackmodel");
const supportteammodel = require("./supportteammodel");
const teachersmodelOE = require("./teachersmodelOE");
const adminAuth = require("./middlewares/adminAuth");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

//* stativ files
// app.use(express.static(path.join(__dirname, "../client", "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
// });
// mongoose.connect(process.env.CONNECTION_URL).then(
//     ()=> console.log('Db connected..')
// )

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(pdfRoutes);

app.get("/", (req, res) => {
  res.send("Hello to VJIT Feedback API 16:46 - May 14 2023 ");
});

// registration of students
app.post("/register", async (req, res) => {
  try {
    //password and confirmpassword is not mandatory to get from client since we didnt keep them as ( required : true ) in model schema
    const {
      fullname,
      collegeId,
      branch,
      email,
      mobile,
      password,
      confirmpassword,
    } = req.body;
    const exist = await users.findOne({ email });
    if (exist) {
      return res.status(200).send("user already registered");
    }
    const existId = await users.findOne({ collegeId });
    if (existId) {
      return res.status(200).send("this collegeID already registered");
    }
    if (password !== confirmpassword) {
      return res.status(400).send("password invalid");
    }

    let newUser = new users({
      fullname,
      collegeId,
      branch,
      email,
      mobile,
      password,
      confirmpassword,
    });
    newUser.save();
    return res.status(200).send("User Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("register Server Error");
  }
});

// // // Teachers -- -- --
app.post("/addteacher", async (req, res) => {
  try {
    const {
      teacherName,
      teacherDepartment,
      classsection,
      subject,

      teachermob,
      teacheremail,
    } = req.body;

    const newteacher = new teachersmodel({
      teacherName,
      teacherDepartment,
      classsection,
      subject,

      teachermob,
      teacheremail,
    });
    await newteacher.save();
    const exist = await teachersmodel.find();
    return res
      .status(200)
      .json({ message: "New Teacher Added successfully", update: exist });
  } catch (err) {
    console.log(err);
    return res.status(500).send("New Teacher Server Error");
  }
});

app.post("/getAllTeachers2", async (req, res) => {
  try {
    // const exist = await teachersmodel.find({"classes.year": {$in: [req.body.dept]}})  // logic is for me , it is not useful to you guys
    const exist = await teachersmodel.find({ classsection: req.body.dept });
    return res.status(200).json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("getAllTeachers Server Error");
  }
});

app.get("/findteacher/:id", async (req, res) => {
  try {
    const exist = await teachersmodel.findById(req.params.id);
    return res.status(200).json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("find teacher Server Error");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { collegeId, password } = req.body;
    const exist = await users.findOne({ collegeId });
    if (!exist) {
      return res.status(200).send("roll number doesn't exist contact admin");
    }
    if (exist.password !== password) {
      return res.status(200).send("Invalid Credentials");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtPassword", { expiresIn: 360000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token: token, id: exist.branch });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("login Server Error");
  }
});

// login for both students and alumini
// app.post("/login", async (req, res) => {
//   try {
//     const { email, clgId } = req.body;
//     let exist = await users.findOne({ email: email.toLowerCase() });
//     if (!exist) {
//       exist = await users.findOne({ email: email });
//     }
//     if (!exist) {
//       return res
//         .status(200)
//         .send(
//           "this email is not registered plz do contact respected faculty to get your correct email"
//         );
//     }
//     if (exist.collegeId !== clgId) {
//       return res.status(200).send("collegeId doesnt match with email");
//     }
//     let payload = {
//       user: {
//         id: exist.id,
//       },
//     };
//     jwt.sign(payload, "jwtPassword", { expiresIn: 360000000 }, (err, token) => {
//       if (err) throw err;
//       return res.json({ token: token, id: exist.branch });
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send("login Server Error");
//   }
// });

//loggined user info
app.get("/myprofile", middleware, async (req, res) => {
  try {
    let myprofile = await users.findById(req.user.id);
    return res.json(myprofile);
  } catch (err) {
    console.log(err);
    return res.status(500).send("myprofile Server Error");
  }
});

//get all students profilew
app.get("/allprofiles", middleware, async (req, res) => {
  try {
    let allprofiles = await users.find();
    return res.json(allprofiles);
  } catch (err) {
    console.log(err);
    return res.status(500).send("allprofiles Server Error");
  }
});

//get all students profilew
app.get("/allfeedbacks", middleware, async (req, res) => {
  try {
    let allfeedbacks = await feedbackmodel.find();
    return res.json(allfeedbacks);
  } catch (err) {
    console.log(err);
    return res.status(500).send("allfeedbacks Server Error");
  }
});
// faculty report
app.get("/count-and-percentage-per-teacher", middleware, async (req, res) => {
  try {
    // Use Mongoose aggregation to group and calculate total count and percentage of subjectKnowledge by teacherName
    const result = await feedbackmodel.aggregate([
      {
        $group: {
          _id: {
            teacherName: "$teacherName", // Group by teacherName
            studentclass: "$studentclass", // Group by branch
            subject: "$subject", // Group by subject
            teacheremail: "$teacheremail",
          },

          totalSubjectKnowledgeCount: {
            $sum: {
              $toInt: "$subjectKnowledge", // Convert subjectKnowledge to integer
            },
          },
          totalCommunicationCount: {
            $sum: {
              $toInt: "$communication", // Convert communication to integer
            },
          },
          totalPresentationSkillsCount: {
            $sum: {
              $toInt: "$presentationSkills", // Convert presentationSkills to integer
            },
          },
          totalPunctualityCount: {
            $sum: {
              $toInt: "$punctuality",
            },
          },
          totalControlOverTheClass: {
            $sum: {
              $toInt: "$controlOverTheClass",
            },
          },
          totalAudibility: {
            $sum: {
              $toInt: "$audibility",
            },
          },
          totalProfessionalism: {
            $sum: {
              $toInt: "$professionalism",
            },
          },
          totalContentOfLecture: {
            $sum: {
              $toInt: "$contentOfLecture",
            },
          },
          totalClarificationOfDoubts: {
            $sum: {
              $toInt: "$clarificationOfDoubts",
            },
          },
          totalExplanationWithExamples: {
            $sum: {
              $toInt: "$explanationWithExamples",
            },
          },
          totalFeedbackCount: { $sum: 1 }, // Count the feedback records
        },
      },
      {
        $project: {
          _id: 0,
          teacherName: "$_id.teacherName",
          studentclass: "$_id.studentclass",
          subject: "$_id.subject",
          teacheremail: "$_id.teacheremail",
          totalSubjectKnowledgeCount: 1,
          totalCommunicationCount: 1,
          totalPresentationSkillsCount: 1,
          totalPunctualityCount: 1,
          totalControlOverTheClass: 1,
          totalAudibility: 1,
          totalProfessionalism: 1,
          totalContentOfLecture: 1,
          totalClarificationOfDoubts: 1,
          totalExplanationWithExamples: 1,
          totalFeedbackCount: 1,
          percentageSubjectKnowledge: {
            $multiply: [
              {
                $divide: ["$totalSubjectKnowledgeCount", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentageCommunication: {
            $multiply: [
              {
                $divide: ["$totalCommunicationCount", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentagePresentationSkills: {
            $multiply: [
              {
                $divide: [
                  "$totalPresentationSkillsCount",
                  "$totalFeedbackCount",
                ],
              },
              10,
            ],
          },
          percentagePunctuality: {
            $multiply: [
              {
                $divide: ["$totalPunctualityCount", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentageControlOverTheClass: {
            $multiply: [
              {
                $divide: ["$totalControlOverTheClass", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentageAudibility: {
            $multiply: [
              {
                $divide: ["$totalAudibility", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentageProfessionalism: {
            $multiply: [
              {
                $divide: ["$totalProfessionalism", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentageContentOfLecture: {
            $multiply: [
              {
                $divide: ["$totalContentOfLecture", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentageClarificationOfDoubts: {
            $multiply: [
              {
                $divide: ["$totalClarificationOfDoubts", "$totalFeedbackCount"],
              },
              10,
            ],
          },
          percentageExplanationWithExamples: {
            $multiply: [
              {
                $divide: [
                  "$totalExplanationWithExamples",
                  "$totalFeedbackCount",
                ],
              },
              10,
            ],
          },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/nooftotalfeedbacks", middleware, async (req, res) => {
  try {
    let myprofile = await users.findById(req.user.id);
    let exist = await teachersmodel.find({ classsection: myprofile.branch });
    return res.status(200).json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("no of total feedbacks Server Error");
  }
});

app.get("/noofgivenfeedbacks", middleware, async (req, res) => {
  try {
    let exist = await feedbackmodel.find({ studentrefid: req.user.id });
    return res.status(200).json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("noofgivenfeedbacks Server Error");
  }
});

//forget password for students
app.post("/forgetpassword", async (req, res, next) => {
  //checking if atleast the users exists or not
  const tuser = await users.findOne({ email: req.body.email });

  if (!tuser) {
    return res.status(200).send("user not found");
  }

  // get resetpassword token
  const resetToken = tuser.getResetPassword();
  // // console.log(resetToken);
  await tuser.save({ validateBeforeSave: false });

  //actual link is http://localhost/api/v1/passwordreset/${resetToken} as local host and http requests
  //can change we use req._
  const resetpasswordURL = `${resetToken}`;
  const resetpasswordMessage = `your's Students Hub reset password verification code is \n\n ${resetpasswordURL} \n\n if u have not
    requested this email, please ignore`;

  try {
    await sendEmail({
      //we will send a object with 3 key value pairs here
      email: tuser.email,
      subject: "Students Hub password Recovery",
      resetpasswordMessage,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${tuser.email} successfully`,
    });
  } catch (err) {
    tuser.resetPasswordToken = undefined;
    tuser.resetPasswordExpire = undefined;
    await tuser.save({ validateBeforeSave: false });

    return res.status(200).send(err.message);
  }
});

//reset password using forgot password
app.post("/resetpassword/:token", async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const tuser = await users.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!tuser) {
    return res.status(200).send("password reset token is invalid or expired");
  }

  if (req.body.password !== req.body.confirmpassword) {
    return res.status(200).send("password did not match");
  }

  tuser.password = req.body.password;
  tuser.confirmpassword = req.body.password;
  tuser.resetPasswordToken = undefined;
  tuser.resetPasswordExpire = undefined;

  await tuser.save();

  return res.status(200).send("password changed successfully");
});

// // // register login -- -- --
app.post("/addadminlogin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const newdata = new adminloginmodel({
      username,
      password,
    });
    await newdata.save();
    return res.status(200).send("adminLogin Details saved successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("addadminlogin Server Error ");
  }
});

/// // register login -- -- --
app.get("/demo/:usernamee/:passwordd", async (req, res) => {
  try {
    const username = req.params.usernamee;
    const password = req.params.passwordd;

    const newdata = new demomodel({
      username,
      password,
    });
    await newdata.save();
    return res.status(200).send("demo Details saved successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("demo Server Error ");
  }
});

app.post("/verifyadminlogin", async (req, res) => {
  try {
    const { username, passwordv } = req.body;
    const exist = await adminloginmodel.findOne({ username });
    if (!exist) {
      return res.status(200).send("Invalid Credentials");
    }
    if (exist.password !== passwordv) {
      return res.status(200).send("Invalid Credentials");
    }
    let payload = {
      user: {
        id: exist.id,
        role: "admin",
      },
    };
    jwt.sign(payload, "jwtPassword", { expiresIn: 360000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token: token, id: exist.branch });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("verify adminlogin Server Error ");
  }
});

// // // Teachers -- -- --
app.post("/comment/:subject", middleware, async (req, res) => {
  try {
    const {
      teacherName,
      teacherrefid,
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
      deptclass,
      comment,
    } = req.body;

    const existteacher = await teachersmodel.findById(teacherrefid);
    const existstudent = await users.findById(req.user.id);

    // const subject = existteacher.classes.map(item => item.year === existstudent.branch)

    const newfeedback = new feedbackmodel({
      teacherName,
      teacherrefid,
      teacherDepartment: existteacher.teacherDepartment,
      teachermob: existteacher.teachermob,
      teacheremail: existteacher.teacheremail,
      subject: existteacher.subject,
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

      studentrefid: existstudent._id,
      studentclgId: existstudent.collegeId,
      studentName: existstudent.fullname,
      studentclass: deptclass,

      comment,
    });
    await newfeedback.save();
    const exist = await feedbackmodel.find();
    return res
      .status(200)
      .json({ message: "feedback submitted successfully", update: exist });
  } catch (err) {
    console.log(err);
    return res.status(500).send("feedback Server Error");
  }
});

// // // Teachers -- -- --
app.post("/comment2", middleware, async (req, res) => {
  try {
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
      deptclass,
      comment,

      oeSubjSec,
    } = req.body;

    const existteacher = await teachersmodelOE.findOne({ classes: oeSubjSec });
    const existstudent = await users.findById(req.user.id);

    // const subject = existteacher.classes.map(item => item.year === existstudent.branch)

    const newfeedback = new feedbackmodel({
      teacherName: existteacher.teacherName,
      teacherrefid: existteacher._id,
      teacherDepartment: existteacher.teacherDepartment,
      teachermob: existteacher.teachermob,
      teacheremail: existteacher.teacheremail,
      subject: existteacher.classes,
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

      studentrefid: existstudent._id,
      studentclgId: existstudent.collegeId,
      studentName: existstudent.fullname,
      studentclass: deptclass,

      comment,

      oe: "completed" || "-",
    });
    await newfeedback.save();

    // await users.findByIdAndUpdate(req.user.id,{

    //     oe : "completed" || "-",

    // })

    const exist = await feedbackmodel.find();
    return res
      .status(200)
      .json({ message: "OE feedback submitted successfully", update: exist });
  } catch (err) {
    console.log(err);
    return res.status(500).send("feedback Server Error");
  }
});

app.get("/presentuser", middleware, async (req, res) => {
  try {
    let exist = await users.findById(req.user.id);
    return res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("present user Server Error");
  }
});

app.get("/checkingoe", middleware, async (req, res) => {
  try {
    let exist = await users.findById(req.user.id);
    // {studentrefid : req.user.id}  //
    let founded = await feedbackmodel.find({ studentrefid: req.user.id });
    let result = founded.filter((profile) => (profile.oe ? profile : null));
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send("checking oe Server 2 Error");
  }
});

app.get("/checkrelation/:tid", middleware, async (req, res) => {
  try {
    const exist = await feedbackmodel.find();
    const found = exist.filter(
      (profile) =>
        profile.teacherrefid === req.params.tid &&
        profile.studentrefid === req.user.id
    );

    if (found.length >= 1) {
      return res.send("relation");
    }
    return res.send("no relation");
  } catch (err) {
    console.log(err);
    return res.status(500).send("checkrelation Server Error");
  }
});

//team of support
app.post("/addsupportteam", async (req, res) => {
  try {
    const { name, clgid, position, mobile, email } = req.body;

    const newsupportteam = new supportteammodel({
      name,
      clgid,
      position,
      mobile,
      email,
    });
    await newsupportteam.save();
    let exist = await supportteammodel.find();
    return res
      .status(200)
      .send({ message: "team member saved successfully", update: exist });
  } catch (err) {
    console.log(err);
    return res.status(500).send("addsupportteam Server Error ");
  }
});

app.get("/getsupportteam", async (req, res) => {
  try {
    let exist = await supportteammodel.find();
    if (exist.length >= 1) {
      return res.status(200).json(exist);
    } else {
      return res.status(200).json(sample);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("getproject Server Error");
  }
});
//

app.post("/addOEteacher", async (req, res) => {
  try {
    const {
      teacherName,
      teacherDepartment,
      classes,

      teachermob,
      teacheremail,
    } = req.body;

    const newOEteacher = new teachersmodelOE({
      teacherName,
      teacherDepartment,
      classes,

      teachermob,
      teacheremail,
    });
    await newOEteacher.save();
    let exist = await teachersmodelOE.find();
    return res
      .status(200)
      .send({ message: "team OE teacher added successfully", update: exist });
  } catch (err) {
    console.log(err);
    return res.status(500).send("add OE teacher Server Error ");
  }
});

// app.listen(PORT,()=> console.log('Server is Running..'))

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running");
  });
});
