import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Forgetpassword from "./components/Forgetpassword";
import Resetpassword from "./components/Resetpassword";
import Dashboard from "./privatecomponents/Dashboard";
import Myprofile from "./privatecomponents/Myprofile";
import Contact from "./privatecomponents/Contact";
import AdminContact from "./privatecomponents/AdminContact";
import Feedback from "./privatecomponents/Feedback";
import Admin from "./components/Admin";
import AdminDashboard from "./privatecomponents/AdminDashboard";
import Instructions from "./privatecomponents/Instructions";
import "./App.css";
import Feedback2 from "./privatecomponents/Feedback2";
import Feedback3 from "./privatecomponents/Feedback3";
import Pagenotfound from "./pages/pagenotfound";
import FacultyReport from "./privatecomponents/FacultyReport";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/instructions" exact element={<Instructions />} />
          <Route path="/forgetpassword" exact element={<Forgetpassword />} />
          <Route path="/resetpassword" exact element={<Resetpassword />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/myprofile" exact element={<Myprofile />} />
          <Route path="/feedback/:tname/:tid" exact element={<Feedback />} />
          <Route path="/feedback2" exact element={<Feedback2 />} />
          <Route path="/feedback3" exact element={<Feedback3 />} />
          <Route path="/contact" exact element={<Contact />} />
          {/* admin */}
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/faculty-report" exact element={<FacultyReport />} />
          <Route path="/adminDashboard" exact element={<AdminDashboard />} />
          <Route path="/admincontact" exact element={<AdminContact />} />

          {/* if non of the above routes doesnot work we go to pagenotfound component page */}
          <Route path="/*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
