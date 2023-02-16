import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import PropTypes from "prop-types";

const PasswordInput = ({ handleChange, name }) => {
  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="pass">
          Password <span className="asterisk">*</span>
        </label>
        <input
          type={passwordEye === false ? "password" : "text"}
          name={name}
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="AiEye">
          {passwordEye === false ? (
            <AiFillEyeInvisible onClick={handlePasswordClick} />
          ) : (
            <AiFillEye onClick={handlePasswordClick} />
          )}
        </div>
      </div>
    </>
  );
};

PasswordInput.propTypes = {
  handleChange: PropTypes.function,
  name: PropTypes.string,
};

export default PasswordInput;
