import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainButton from "../buttons/MainButton";
import { AuthContext } from "../../hooks/AuthContext";
import "./home.css";

const FirstSec = () => {
  const { isLogged } = useContext(AuthContext);
  return (
    <div className="first_sec">
      <img
        src="https://res.cloudinary.com/hapiii/image/upload/v1671901357/HYF/graduation%20project/ztmw8sqj5i2ireioheyt.jpg"
        alt="firstSec bg"
      />
      <div className="content container">
        <h3>
          Need a Courier ? <span className="brand">Courier4Me</span> Handle your
          Needs
        </h3>
        <h4>The cheapest, the fastest, anywhere in the Netherlands!</h4>
        <Link to={isLogged ? "/request" : "/login"}>
          <MainButton title="Make a Request" />
        </Link>
      </div>
    </div>
  );
};

export default FirstSec;
