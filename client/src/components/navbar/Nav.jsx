import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import TEST_ID from "./Nav.testid.js";
import { AuthContext } from "../../hooks/AuthContext";
import "./navbar.css";

const Nav = () => {
  const { user, currentUser, dispatch, error, isLogged } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/");
      window.location.reload();
    } catch (err) {
      throw error;
    }
  };

  const userDetails = {
    profilePic: currentUser?.profilePic || user?.profilePic,
    firstName: currentUser?.firstName || user?.firstName,
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container position-relative">
        <div className="logo-container">
          <Link to="/">
            <img
              className="logo"
              src="https://res.cloudinary.com/hapiii/image/upload/v1672439815/HYF/graduation%20project/ztpceikiod6rgs4qefpo.png"
              alt="logo"
            />
            <span className="navbar-brand">Courier4Me</span>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className={isLogged ? "navbar-nav logged" : "navbar-nav"}>
            <li className="nav-item">
              <NavLink to="/" data-testid={TEST_ID.linkToHome}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/press">Press</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/faq">FAQ</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className={isLogged ? "signout" : "signout loggedout"}>
              {user && (
                <div className="name_signout">
                  <Link to="/account" className="name">
                    {userDetails.profilePic && (
                      <img src={userDetails.profilePic} alt="profile pic" />
                    )}
                    Hi {userDetails && userDetails.firstName.substr(0, 15)}
                  </Link>
                  <span className="signout_btn" onClick={handleClick}>
                    {" "}
                    sign out
                  </span>
                </div>
              )}
            </li>
            <li className="nav-item">
              {user && <NavLink to="/account"> Account</NavLink>}
            </li>
            <li className="nav-item login">
              {!user && <NavLink to="/login">Login</NavLink>}
            </li>
            <li className="nav-item register">
              {!user && <NavLink to="/signup">SignUp</NavLink>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
