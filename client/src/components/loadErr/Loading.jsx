import React from "react";
import PropTypes from "prop-types";
import "./loadErr.css";

const Loading = ({ text }) => {
  return (
    <div className="load_err_container">
      <h5>{text}</h5>
      <img
        src="https://res.cloudinary.com/hapiii/image/upload/v1674746501/moving%20%20car%2C%20motor/zuc16v0xajvzy3v4fxcl.gif"
        alt="loading img"
      />
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loading;
