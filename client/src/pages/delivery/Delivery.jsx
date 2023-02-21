import React, { useState, useContext, useEffect } from "react";
import MainButton from "../../components/buttons/MainButton";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet";
import "./delivery.css";

const Delivery = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [delivery, setDelivery] = useState({
    shipment: "",
    size: "",
    weight: "",
    pickupStreet: "",
    pickupHouseNo: "",
    pickupZipCode: "",
    pickupCity: "",
    pickupDate: "",
    deliveryStreet: "",
    deliveryHouseNo: "",
    deliveryZipCode: "",
    deliveryCity: "",
    comment: "",
    courierEmail: "",
    requestStatus: "pending",
    packageStatus: "pending",
    notificationForCourier: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const date = new Date().toDateString();
  const onSuccess = (response) => {
    navigate("/yourpackage", { state: response });
  };
  const { performFetch, cancelFetch } = useFetch("/delivery/create", onSuccess);

  const handleChange = (e) => {
    setDelivery((previous) => ({ ...previous, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (location.state !== null) {
      setDelivery({
        ...location.state.request,
        pickupDate: "",
        courierEmail: "",
        requestStatus: "pending",
        packageStatus: "pending",
      });
    }
    return cancelFetch();
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        delivery: {
          email: user.email,
          date: date,
          shipment: delivery.shipment,
          size: delivery.size,
          weight: delivery.weight,
          pickupStreet: delivery.pickupStreet,
          pickupHouseNo: delivery.pickupHouseNo,
          pickupZipCode: delivery.pickupZipCode,
          pickupCity: delivery.pickupCity,
          pickupDate: delivery.pickupDate,
          deliveryStreet: delivery.deliveryStreet,
          deliveryHouseNo: delivery.deliveryHouseNo,
          deliveryZipCode: delivery.deliveryZipCode,
          deliveryCity: delivery.deliveryCity,
          comment: delivery.comment,
          courierEmail: delivery.courierEmail,
          requestStatus: delivery.requestStatus,
          packageStatus: delivery.packageStatus,
          notificationForCourier: delivery.notificationForCourier,
        },
      }),
    });
    const {
      shipment,
      size,
      weight,
      pickupStreet,
      pickupHouseNo,
      pickupZipCode,
      pickupCity,
      pickupDate,
      deliveryStreet,
      deliveryHouseNo,
      deliveryZipCode,
      deliveryCity,
    } = delivery;
    if (
      !shipment ||
      !size ||
      !weight ||
      !pickupStreet ||
      !pickupHouseNo ||
      !pickupZipCode ||
      !pickupCity ||
      !pickupDate ||
      !deliveryStreet ||
      !deliveryHouseNo ||
      !deliveryZipCode ||
      !deliveryCity
    ) {
      setError(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>COURIER4ME | Request</title>
      </Helmet>
      <div className="deliver_page">
        <div className="container">
          <h1>Make a Request</h1>
          <div className="delivery_data">
            <form
              action="POST"
              id="deliverForm"
              onSubmit={(e) => handleRequest(e)}
            >
              <div>
                <div className="pickup_details">
                  <h5 className="del_sec_title">PACKAGE DETAIL</h5>
                  <div className="form-group">
                    <label htmlFor="shipment">
                      Shipment<span className="asterisk">*</span>
                    </label>
                    <select
                      className="input_field"
                      name="shipment"
                      id="shipment"
                      defaultValue={
                        delivery.shipment !== ""
                          ? delivery.shipment
                          : "placeholder"
                      }
                      onChange={handleChange}
                    >
                      <option
                        value="placeholder"
                        className="first_option"
                        disabled
                        hidden
                      >
                        Select from...
                      </option>
                      <option value="envelop">Envelop</option>
                      <option value="box">Box</option>
                      <option value="pallet">Pallet</option>
                      <option value="otherwise">
                        otherwise determine it in comment
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="size">
                      Size (dm<sup>3</sup>/lt)
                      <span className="asterisk">*</span>
                    </label>
                    <select
                      className="input_field"
                      defaultValue={
                        delivery.size !== "" ? delivery.size : "placeholder"
                      }
                      name="size"
                      id="size"
                      onChange={handleChange}
                    >
                      <option
                        value="placeholder"
                        className="first_option"
                        disabled
                        hidden
                      >
                        Select from...
                      </option>
                      <option value="small (<5)">Small ({"<"}5)</option>
                      <option value="middle (5-10)">Middle (5-10)</option>
                      <option value="large (10-15)">Large (10-15)</option>
                      <option value="xlarge (>15)">X-Large ({">"}15)</option>
                      <option value="other">
                        Please describe in the comment..
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">
                      Weight (kg)<span className="asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      min={0}
                      value={delivery.weight}
                      placeholder="weight..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pickup_details">
                  <h5 className="del_sec_title">PICKUP DETAIL</h5>
                  <div className="form-group">
                    <label htmlFor="pickupStreet">
                      Pickup Street<span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="pickupStreet"
                      id="pickupStreet"
                      value={delivery.pickupStreet}
                      placeholder="add your pickup street..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pickupHouseNo">
                      Pickup House No<span className="asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="pickupHouseNo"
                      id="pickupHouseNo"
                      value={delivery.pickupHouseNo}
                      placeholder="add your house number..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pickupZip">
                      Pickup Zip Code<span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="pickupZipCode"
                      id="pickupZipCode"
                      value={delivery.pickupZipCode}
                      placeholder="add your zip code..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pickupCity">
                      Pickup City<span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="pickupCity"
                      id="pickupCity"
                      value={delivery.pickupCity}
                      placeholder="add your city..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pickupDate">
                      Pickup Date<span className="asterisk">*</span>
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      id="pickupDate"
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="delivery_details">
                  <h5 className="del_sec_title">DELIVERY DETAIL</h5>
                  <div className="form-group">
                    <label htmlFor="deliveryStreet">
                      Delivery Street<span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="deliveryStreet"
                      id="deliveryStreet"
                      value={delivery.deliveryStreet}
                      placeholder="add delivery street..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deliveryHouseNo">
                      Delivery House No<span className="asterisk">*</span>
                    </label>
                    <input
                      type="number"
                      name="deliveryHouseNo"
                      id="deliveryHouseNo"
                      min={0}
                      value={delivery.deliveryHouseNo}
                      placeholder="add delivery house number..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deliveryZip">
                      Delivery Zip Code<span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="deliveryZipCode"
                      id="deliveryZipCode"
                      value={delivery.deliveryZipCode}
                      placeholder="add delivery zip code..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deliveryCity">
                      Delivery City<span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="deliveryCity"
                      id="deliveryCity"
                      value={delivery.deliveryCity}
                      placeholder="add delivery city..."
                      className="input_field"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      name="comment"
                      id="comment"
                      value={delivery.comment}
                      placeholder="add your comment..."
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="form-group reqbutton_errcontainer">
                <button className="send_btn " type="submit">
                  <MainButton title="Make a Request" />
                </button>
                {error && (
                  <p className="error-msg">
                    an error is found, please fill all field with{" "}
                    <span className="asterisk">(*)</span> and try again
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;
