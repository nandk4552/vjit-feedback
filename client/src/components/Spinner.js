import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Spinner = () => {
  return (
    <div className="bg-secondary-subtle d-flex align-items-center justify-content-center vh-100 z-3">
      <PuffLoader color="#da2032" size={100} />{" "}
    </div>
  );
};

export default Spinner;
