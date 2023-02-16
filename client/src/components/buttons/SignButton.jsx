import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const SignButton = ({ title, handleClick, disabled, titleTxt }) => {
  return (
    <button
      onClick={handleClick}
      className={disabled ? "sign_button disabled" : "sign_button"}
      title={disabled ? titleTxt : ""}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

SignButton.propTypes = {
  title: PropTypes.string,
  titleTxt: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default SignButton;
