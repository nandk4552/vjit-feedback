import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Spinner = () => {
  return (
    <>
      <div className="bg-secondary-subtle d-flex flex-column align-items-center justify-content-center mt-5 z-3">
        <PuffLoader color="#da2032" size={100} />
        <h4 className="my-3 text-secondary">Loading...</h4>
      </div>
    </>
  );
};

export default Spinner;
