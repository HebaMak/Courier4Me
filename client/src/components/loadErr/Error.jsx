import React from "react";
import PropTypes from "prop-types";
import "./loadErr.css";

const Error = ({ text }) => {
  return (
    <div className="load_err_container">
      <h5>{text}</h5>
      <img
        className="err_img"
        src="https://res.cloudinary.com/hapiii/image/upload/v1668878616/Error%20imgs/rixenux81h6bhjl5eq0n.gif"
        alt="error img"
      />
    </div>
  );
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Error;
