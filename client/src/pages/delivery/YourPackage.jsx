import React from "react";
import { useLocation, Link } from "react-router-dom";
import MainButton from "../../components/buttons/MainButton";
import { Helmet } from "react-helmet";
import "./yourPackage.css";

const YourPackage = () => {
  const { state } = useLocation();

  return (
    <>
      <Helmet>
        <title>COURIER4ME | Request details</title>
      </Helmet>
      <div className="ur_package_page">
        <div className="content">
          <h3 className="success_msg">your order has been created</h3>
          <h1>your package details</h1>
          {state && state.delivery && (
            <div className="delivery_data">
              <p className="data_title">
                Order Date:
                <span className="data_info">{state.delivery.pickupDate}</span>
              </p>

              <p className="data_title">
                Shipment Type:
                <span className="data_info">{state.delivery.shipment}</span>
              </p>

              <p className="data_title">
                package Size:
                <span className="data_info">
                  {state.delivery.size} (dm<sup>3</sup>/lt)
                </span>
              </p>

              <p className="data_title">
                {" "}
                package Weight:
                <span className="data_info">{state.delivery.weight} kg</span>
              </p>

              <p className="data_title">
                Pickup Address:
                <span className="data_info">{state.delivery.pickupStreet}</span>
                <span className="data_info">
                  {state.delivery.pickupHouseNo},
                </span>
                <span className="data_info">
                  {state.delivery.pickupZipCode} -
                </span>
                <span className="data_info">{state.delivery.pickupCity}</span>
              </p>

              <p className="data_title">
                Drop-off Address:
                <span className="data_info">
                  {state.delivery.deliveryStreet}
                </span>
                <span className="data_info">
                  {state.delivery.deliveryHouseNo},
                </span>
                <span className="data_info">
                  {state.delivery.deliveryZipCode} -
                </span>
                <span className="data_info">{state.delivery.deliveryCity}</span>
              </p>

              <p className="data_title">
                Additional Comment:
                <span className="data_info">
                  {state.delivery.comment
                    ? state.delivery.comment
                    : "No comment added"}
                </span>
              </p>
            </div>
          )}
          <div className="request_container">
            <h5>Make another order</h5>
            <Link to="/request">
              <MainButton title="Make a Request" />
            </Link>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default YourPackage;
