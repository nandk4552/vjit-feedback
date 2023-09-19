import React from "react";

const Footer = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-bottom text-center py-3 bg-dark text-white bg-blue">
        &copy; {new Date().getFullYear()} VJIT Feedback Portal. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
