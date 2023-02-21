import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const ClearButton = ({ title, handleClick }) => {
  return (
    <button onClick={handleClick} className="btn delete_btn">
      {title}
    </button>
  );
};

ClearButton.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ClearButton;
