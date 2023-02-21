import React from "react";

const CourierFeatures = () => {
  return (
    <div className="courier">
      <div className="content container">
        <div className="courier_item">
          <i className="fa fa-eur" aria-hidden="true"></i>
          <h4>Competitive Earn</h4>
          <ul className="list-unstyled">
            <li>Earn a competitive hourly rate</li>
            <li>Enjoy a range of benefits</li>
          </ul>
        </div>
        <div className="courier_item">
          <i className="fa fa-sun-o" aria-hidden="true"></i>
          <h4>Your future starts here</h4>
          <ul className="list-unstyled">
            <li>A stable and secure work environment</li>
            <li>Weekly pay and exclusive partnerships</li>
          </ul>
        </div>
        <div className="courier_item">
          <i className="fa fa-handshake-o" aria-hidden="true"></i>
          <h4>We are here for you</h4>
          <ul className="list-unstyled">
            <li>The right shifts</li>
            <li>Free equipment and on-demand support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourierFeatures;
