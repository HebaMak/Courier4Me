import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SignButton from "../../components/buttons/SignButton";
import { AuthContext } from "../../hooks/AuthContext";
import PasswordInput from "./PasswordInput";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./login.css";

const Login = () => {
  const location = useLocation();
  let userEmail = "";
  if (location.state !== null) {
    userEmail = location.state.userEmail;
  }
  const [credentials, setCredentials] = useState({
    email: userEmail,
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.BASE_SERVER_URL}/api/user/login`,
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setIsError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>COURIER4ME | Login</title>
      </Helmet>
      <div className="login_container">
        <div className="content">
          <div className="login-form">
            <h2 className="form-title">Log in</h2>
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
              <div className="form-group password">
                <Link to="/resetpassword" className="forgot-password">
                  forgot password?
                </Link>
                <PasswordInput handleChange={handleChange} name="your_pass" />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="agree-term"
                />
                <label htmlFor="remember-me" className="label-agree-term">
                  Remember me
                </label>
              </div>
              <div className="loginBtnContainer">
                <div
                  className="form-group form-button"
                  onClick={handleClick}
                  disabled={loading}
                >
                  <SignButton title="Log in" />
                </div>
                {isError && <span className="error_msg">{error?.msg}</span>}
              </div>

              <Link to="/signup" className="register_button">
                <SignButton title="Register" />
              </Link>
            </form>

            <div className="social-login">
              <p className="social-label">
                <span>Or</span> login with:
              </p>
              <ul className="socials list-unstyled">
                <li>
                  <i className="display-flex-center zmdi zmdi-facebook"></i>
                </li>
                <li>
                  <i className="display-flex-center zmdi zmdi-twitter"></i>
                </li>
                <li>
                  <i className="display-flex-center zmdi zmdi-google"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
