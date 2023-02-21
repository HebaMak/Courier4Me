import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignButton from "../../components/buttons/SignButton";
import useFetch from "../../hooks/useFetch.js";
import PasswordInput from "./PasswordInput";
import { Helmet } from "react-helmet";
import "./signUp.css";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    profilePic: "",
  });

  const [isError, setIsError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [agreement, setAgreement] = useState(false);
  const [isCourier, setIsCourier] = useState(false);

  const navigate = useNavigate();

  const onSuccess = () => {
    const userEmail = user.email;
    navigate("/signupSuccess", { state: { userEmail } });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch();
  }, []);

  const handleChange = (e) => {
    user[e.target.id] = e.target.value;
    setUser({ ...user });
  };

  // some frontend validation
  const checkValidation = (e) => {
    const confPass = e.target.value;
    handleChange(e);
    if (user.password !== confPass) {
      setIsError("confirm password should be match with password");
    } else {
      setIsError("");
      setAgreement(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          isCourier: isCourier,
          profilePic:
            "https://res.cloudinary.com/hapiii/image/upload/v1674139127/HYF/graduation%20project/go4nbxhyzhve9udxjnff.png",
        },
      }),
    });
  };

  let statusComponent = null;
  if (error != null) {
    statusComponent = `Error while trying to register, ${error
      .toString()
      .substr(11)}`;
  } else if (isLoading) {
    statusComponent = <div>Sending message...</div>;
  }

  return (
    <>
      <Helmet>
        <title>COURIER4ME | Register</title>
      </Helmet>
      <div className="signup_container">
        <div className="content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form method="POST" id="register-form">
              <div className="form_content">
                <div className="form-group">
                  <label htmlFor="name">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birthday">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Your Last Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    className=""
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Your Phone Number"
                    onChange={handleChange}
                  />
                </div>
                <PasswordInput handleChange={handleChange} name="pass" />
                <PasswordInput handleChange={checkValidation} name="re_pass" />
                <p className="pass_msg">
                  <span className="asterisk">*</span> Password must contain at
                  least 6 letters and numbers, including at least one capital
                  and small letter
                </p>
              </div>
              <div className="form-checkbox">
                {!isCourier ? (
                  <p className="courierExplanation">
                    You are registering as a customer! To register as customer
                    and courier, please click checkbox!
                  </p>
                ) : (
                  <p className="courierExplanation">
                    You are registering as customer and courier! To register
                    only as a customer, please remove checkbox!
                  </p>
                )}
                <div className="agree-term-container">
                  <input
                    type="checkbox"
                    name="courierCheckbox"
                    id="courierCheckbox"
                    className="agree-term"
                    onClick={() => setIsCourier(!isCourier)}
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    I want to sign up as a customer and courier
                  </label>
                </div>
                <div className="agree-term-container">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                    disabled={!agreement}
                    onClick={() => setDisabled(!disabled)}
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    I agree all statements in{" "}
                    <a href="#" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
              </div>

              <div className="reg_msg">
                <SignButton
                  handleClick={handleSubmit}
                  disabled={disabled}
                  title=" Register"
                  titleTxt="fill fields & check agree Before Register"
                />
                <div className="reg_fail">{statusComponent || isError}</div>
              </div>
              <div className="login_button_container">
                <Link to="/login" className="login_button">
                  <SignButton title="Log in" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Signup;
