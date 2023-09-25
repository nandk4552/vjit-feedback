const express = require("express");
const { createpdf, fetchpdf, sendpdf } = require("../controller/pdfController");
const pdfRoutes = express.Router();

pdfRoutes.post("/createpdf", createpdf);
pdfRoutes.get("/fetchpdf", fetchpdf);
pdfRoutes.post("/sendpdf", sendpdf);
module.exports = pdfRoutes;
