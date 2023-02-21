import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MainButton from "../../components/buttons/MainButton";
import ClearButton from "../../components/buttons/ClearButton";
import axios from "axios";
import "./deliveryHistory.css";

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveries = async () => {
      const res = await axios.get(
        `${process.env.BASE_SERVER_URL}/api/delivery/`
      );
      const historicDeliveries = res.data.result.filter(
        (delivery) =>
          (delivery.email === user.email ||
            delivery.courierEmail === user.email) &&
          delivery.requestStatus === "passive"
      );
      setDeliveries(historicDeliveries);
    };

    fetchDeliveries();
  }, [user]);

  const handleDeleteOne = async (e) => {
    await axios.delete(
      `${process.env.BASE_SERVER_URL}/api/delivery/${e.target.id}`
    );
    const filteredDels = deliveries.filter(
      (delivery) => delivery._id !== e.target.id
    );
    setDeliveries(filteredDels);
  };

  const handleClear = async (e) => {
    e.preventDefault();
    await axios.delete(
      `${process.env.BASE_SERVER_URL}/api/delivery/remove/${user.email}`
    );
    setDeliveries([]);
  };

  const makeRequestAgain = (request) => {
    navigate("/request", { state: { request } });
  };

  return (
    <div className="deliveries_history">
      <h4>delivery history</h4>
      {deliveries && deliveries.length === 0 && (
        <h5> You have not any deliveries in your History</h5>
      )}
      {deliveries && deliveries.length > 0 && (
        <>
          <div className="clear_btn_container">
            <ClearButton title="Clear History" handleClick={handleClear} />
          </div>
          <h6 className="number">
            your deliveries number: {deliveries.length}
          </h6>
          <h6 className="history_title">your deliveries history:</h6>
          <ul className="deliver_list">
            {deliveries.map((delivery) => {
              const {
                shipment,
                deliveryCity,
                deliveryStreet,
                pickupCity,
                pickupStreet,
                date,
                courierEmail,
                email,
                packageStatus,
              } = delivery;
              return (
                <li key={delivery._id}>
                  <span>
                    {" "}
                    You sent a/an:
                    <span className="del_data"> {shipment}, </span>
                  </span>
                  <span>
                    from:
                    <span className="del_data">
                      {" "}
                      {pickupStreet}-{pickupCity},
                    </span>
                  </span>
                  <span>
                    to:
                    <span className="del_data">
                      {" "}
                      {deliveryStreet}-{deliveryCity},
                    </span>
                  </span>
                  <span>
                    at:
                    <span className="del_data"> {date},</span>
                  </span>
                  <span>
                    role:
                    <span className="del_data">
                      {" "}
                      {user.email === courierEmail ? "Courier" : "Customer"},
                    </span>
                  </span>
                  <span>
                    package status:
                    <span className="del_data"> {packageStatus},</span>
                  </span>
                  {(packageStatus === "cancelled" ||
                    packageStatus === "cannot be delivered") &&
                    user.email === email && (
                      <span>
                        <div className="button_container make_request_again">
                          <button
                            onClick={() => {
                              makeRequestAgain(delivery);
                            }}
                          >
                            Make Request Again
                          </button>
                        </div>
                      </span>
                    )}
                  <i
                    id={delivery._id}
                    className="fa fa-trash-o"
                    aria-hidden="true"
                    onClick={handleDeleteOne}
                  ></i>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <Link to="/request" className="req_btn">
        <MainButton title="Make a Request" />
      </Link>
    </div>
  );
};

export default DeliveryHistory;
