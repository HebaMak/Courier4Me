import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignButton from "../../components/buttons/SignButton";
import celebration from "../../assets/celebration.mp4";
import "./signupSuccess.css";

const SignupSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state.userEmail;
  const handleClick = () => {
    navigate("/login", { state: { userEmail } });
  };

  return (
    <div className="signup_container">
      <div className="content go_to_login_content">
        <div className="celebration">
          <video src={celebration} autoPlay muted loop></video>
        </div>
        <div className="confettiText">
          <div>
            <h3>Can you see the confetties?</h3>
            <h4>Then what are you waiting for!</h4>
            <h4>Join the party!</h4>
          </div>
          <div className="go_to_login_btn">
            <SignButton title="Login Page" handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
