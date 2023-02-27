import React, { useState } from "react";
import SignButton from "../../components/buttons/SignButton";
import axios from "axios";
import "../loginSignup/login.css";

const ResetPassword = () => {
  const [credentials, setCredentials] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/forgotpassword`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(res.data.status);
    } catch (error) {
      return error.response;
    }
  };

  return (
    <div className="login_container">
      <div className="content">
        <div className="login-form">
          <h2 className="form-title">Reset Password</h2>
          <form method="POST" id="login-form">
            <div className="form-group form-group-login">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                placeholder="Your Email..."
                onChange={handleChange}
              />
            </div>

            <div className="loginBtnContainer">
              <div
                className="form-group form-button forgot-password-button"
                onClick={handleClick}
              >
                <SignButton title="Reset" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
