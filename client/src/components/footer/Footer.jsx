import React, { useContext } from "react";
import image from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";
import "./footer.css";

const Footer = () => {
  const { isLogged } = useContext(AuthContext);
  return (
    <footer className="">
      <div className="container">
        <div className="footer_content">
          <div className="content_item logo">
            <div className="logo_container">
              <Link to="/">
                <img
                  className="logo"
                  src="https://res.cloudinary.com/hapiii/image/upload/v1672439815/HYF/graduation%20project/ztpceikiod6rgs4qefpo.png"
                  alt="logo"
                />
                <span className="footer_brand">Courier4Me</span>
              </Link>
            </div>
            <h5>Ready for your first order?</h5>
          </div>
          <div className="content_item news_press">
            <div className="item">
              <h5 className="title">News Room</h5>
              <Link to="/press" className="footer_links">
                Press releases
              </Link>
            </div>
            <div className="item">
              <h5 className="title help">Need Help?</h5>
              <Link to="/faq" className="footer_links">
                FAQ
              </Link>
              <Link to="/contact" className="footer_links">
                Contact
              </Link>
            </div>
          </div>
          <div className="content_item join_future">
            <h5 className="title">Join the Future</h5>
            {isLogged ? (
              <div>
                <Link to="/account" className="footer_links">
                  Account!
                </Link>
              </div>
            ) : (
              <Link to="/signup" className="footer_links">
                Sign Up!
              </Link>
            )}
            <Link
              to={isLogged ? "/becourier" : "/login"}
              className="footer_links"
            >
              Become a courier!
            </Link>
          </div>
          <div className="content_item social">
            <h5 className="title">Follow Us</h5>
            <ul className="list-unstyled">
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
            <img src={image} alt="logo" className="courier_img" />
          </div>
        </div>
      </div>

      <hr />
      <div className="footer_end">
        <p>
          <Link to="/" className="brand">
            {" "}
            Courier4Me{" "}
          </Link>
          <Link to="/about">team</Link>
          &copy; 2022
        </p>
      </div>
    </footer>
  );
};

export default Footer;
