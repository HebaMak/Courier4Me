import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const MainButton = ({ title }) => {
  return (
    <>
      <span className="request_btn">{title}</span>
      <span className="icon_btn">
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      </span>
    </>
  );
};

MainButton.propTypes = {
  title: PropTypes.string.isRequired,
};
export default MainButton;
