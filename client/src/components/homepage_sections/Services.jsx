import React, { useContext } from "react";
import MainButton from "../buttons/MainButton.jsx";
import { Link } from "react-router-dom";
import SenderServices from "./SenderServices";
import CourierFeatures from "./CourierFeatures";
import { AuthContext } from "../../context/AuthContext";

const Services = () => {
  const { isLogged } = useContext(AuthContext);
  return (
    <div className="services">
      <div className="content container">
        <div className="top_part">
          <div className="left">
            <img
              className="image"
              src="https://res.cloudinary.com/hapiii/image/upload/v1672084789/HYF/graduation%20project/l1uezldft5r9fwo4isxy.jpg"
              alt="top_img"
            />
          </div>
          <div className="right">
            <img
              className="watermark"
              src="https://res.cloudinary.com/hapiii/image/upload/v1672402094/HYF/graduation%20project/cqovbipsktlapwplbbm4.png"
              alt="logo"
            />
            <h3 className="service_title">Need a Courier ?</h3>
            <p>
              If you need an operation such as regular or irregular collection
              or distribution of files, packages and similar shipments from
              multiple locations such as your branches, dealers, dealership
              points, customers, we can establish special field operations all
              over the Netherlands thanks to Courier4Me. Click Make Request
              option for takeaway and receive your products safely with
              Courier4Me.
            </p>
            <Link to={isLogged ? "/request" : "/login"}>
              <MainButton title="Make a Request" />
            </Link>
          </div>
        </div>
      </div>
      <SenderServices />
      <div className="content container">
        <div className="bottom_part">
          <div className="left">
            <img
              className="watermark"
              src="https://res.cloudinary.com/hapiii/image/upload/v1672402094/HYF/graduation%20project/cqovbipsktlapwplbbm4.png"
              alt="logo"
            />
            <h3 className="service_title">Become a Courier</h3>
            <p>
              Our hero couriers continue to be the pioneers of fast and safe
              delivery in many provinces of the Netherlands! If you want to be a
              part of our team! Apply now as a courier or update your status by
              clicking the link!
            </p>
            <Link to={isLogged ? "/account" : "/login"}>
              <MainButton title="Become a Courier" />
            </Link>
          </div>
          <div className="right">
            <img
              className="image"
              src="https://res.cloudinary.com/hapiii/image/upload/v1672084914/HYF/graduation%20project/frxx8vlycg3yvvi1k6s3.jpg"
              alt="bottom_img"
            />
          </div>
        </div>
      </div>
      <CourierFeatures />
    </div>
  );
};

export default Services;
