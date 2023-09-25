import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const PdsCreator = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [reciptId, setreciptId] = useState("");
  const [price1, setprice1] = useState(0);
  const [price2, setprice2] = useState(0);
  const [price3, setprice3] = useState(0);
  const data = { name, reciptId, email, price1, price2, price3 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !reciptId || !email || !price1 || !price2 || !price3) {
      alert("required all fields");
      return;
    }
    try {
      await axios
        .post("http://localhost:8000/createpdf", data)
        .then(async (res) => {
          await axios
            .get("http://localhost:8000/fetchpdf", { responseType: "blob" })
            .then((res) => {
              const pdfBlob = new Blob([res.data], { type: "application/pdf" });
              saveAs(pdfBlob, "invoice.pdf");
            })
            .then(async () => {
              await axios
                .post("http://localhost:8000/sendpdf", { email })
                .then((res) => {
                  console.log(res);
                  alert(res.data);
                  setemail("");
                  setname("");
                  setreciptId("");
                  setprice1(0);
                  setprice2(0);
                  setprice3(0);
                });
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="main-block">
      <h1>Generate and Download PDF</h1>
      <form onSubmit={handleSubmit}>
        <div className="info">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Recipt Id"
            name="reciptId"
            value={reciptId}
            onChange={(e) => setreciptId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price1"
            name="price1"
            value={price1}
            onChange={(e) => setprice1(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price2"
            name="price2"
            value={price2}
            onChange={(e) => setprice2(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price3"
            name="price3"
            value={price3}
            onChange={(e) => setprice3(e.target.value)}
          />
        </div>
        <button type="submit">Download Pdf</button>
      </form>
    </div>
  );
};

export default PdsCreator;
