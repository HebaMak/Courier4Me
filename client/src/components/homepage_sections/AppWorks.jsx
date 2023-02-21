import React from "react";
import "./home.css";

function AppWorks() {
  return (
    <div className="content app-works ">
      <div className="container">
        <h3 className="title">How to use the Courier4Me app ?</h3>
        <p className="intro_text">
          When you open the app, you can click on{" "}
          <strong>
            <span>Make a Request</span>
          </strong>{" "}
          to make a delivery request from any address to any other address in
          the Netherland. We offer instant delivery requests through people who
          have signed up as couriers using their bicycle or car.
        </p>
        <div className="steps">
          <div className="order">
            <div className="img_container">
              <img src="https://res.cloudinary.com/hapiii/image/upload/v1674344752/HYF/graduation%20project/gpdkpj6tmox5o8oqxugd.jpg"></img>
            </div>
            <div>
              <h4>Order a delivery</h4>
              <p>
                To order a delivery, you will need to provide your pickup
                address, the delivery address and the type of package. Our app
                will then show you an estimated delivery time for the pickup,
                and the price of the order including tax and delivery fee. When
                everything looks right just tap Order and thats it. Currently,
                you can pay for the delivery directly to the courier when they
                come to pick up the package.
              </p>
            </div>
          </div>
          <div className="track">
            <div className="img_container">
              <img src="https://res.cloudinary.com/hapiii/image/upload/v1674345038/HYF/graduation%20project/i7wnm3i8tfl926rjm73k.jpg"></img>
            </div>
            <div>
              <h4>Track</h4>
              <p>
                Follow your order in the app. First you will see the app accept
                your request, and it will start looking for a Courier.Then when
                the app finds a courier nearby whether on a car, or a bike, they
                will come to you to pick it up. Next, they will directly deliver
                the package to the address you put in the form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppWorks;
