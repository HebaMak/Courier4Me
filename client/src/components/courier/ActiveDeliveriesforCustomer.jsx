import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch.js";
import Accordion from "react-bootstrap/Accordion";

const ActiveDeliveriesforCourier = () => {
  const [deliveryRequests, setDeliveryRequests] = useState([]);

  const { user } = useContext(AuthContext);

  const {
    performFetch: performFetchGet,
    error: errorGet,
    isLoading: isLoadingGet,
  } = useFetch("/delivery", (response) => {
    const requests = response.result.filter(
      (request) =>
        request.email === user.email &&
        (request.requestStatus === "active" ||
          request.requestStatus === "pending")
    );
    setDeliveryRequests(requests);
  });

  useEffect(() => {
    performFetchGet();
  }, []);

  return (
    <div className="container cusromer_dels_req">
      <h4 className="pending-delivery-title mb-4">Your Delivery Requests</h4>
      <section className="request-list">
        {isLoadingGet && <p>Loading...</p>}
        {errorGet && <p>Something went wrong! {errorGet}</p>}
        {deliveryRequests && deliveryRequests.length === 0 && (
          <h5>You have no delivery requests yet</h5>
        )}
        {deliveryRequests &&
          deliveryRequests.map((request) => (
            <div className="accordion" key={request._id}>
              <Accordion>
                <Accordion.Item eventKey={request._id}>
                  <Accordion.Header>
                    <div className="accordion_header_content">
                      <div className="header_part">
                        <span className="del_title">Shipment is a/an:</span>
                        <span className="del_info">{request.shipment},</span>
                      </div>
                      <div className="header_part">
                        <span className="del_title">pick up from:</span>
                        <span className="del_info">{request.pickupCity},</span>
                      </div>
                      <div className="header_part">
                        <span className="del_title">& send to:</span>
                        <span className="del_info">
                          {request.deliveryCity}.
                        </span>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <table>
                      <tbody>
                        <tr>
                          <th>Courier: </th>
                          <td
                            title={request && request.courierEmail}
                            className="text-capitalize"
                          >
                            {request.courierEmail
                              ? request.courierEmail.substring(
                                  0,
                                  request.courierEmail.indexOf("@")
                                )
                              : "Pending"}
                          </td>
                        </tr>
                        <tr>
                          <th>Package info: </th>
                          <td>
                            <div className="accordion_body_content">
                              <div className="body_part">
                                <span className="del_body_title">
                                  package is a/an:
                                </span>
                                <span className="del_body_info">
                                  {request.shipment},
                                </span>
                              </div>
                              <div className="body_part">
                                <span className="del_body_title">
                                  {" "}
                                  with size:
                                </span>
                                <span className="del_body_info">
                                  {request.size},
                                </span>
                              </div>
                              <div className="body_part">
                                <span className="del_body_title">
                                  & weight:
                                </span>
                                <span className="del_body_info">
                                  {request.weight}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>Pickup Date </th>
                          <td>
                            <span className="del_body_title">
                              {request.pickupDate}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th rowSpan={2}>Delivery: </th>
                          <td>
                            <span className="del_body_title">from:</span>
                            <span className="del_body_info">
                              {request.pickupStreet} {request.pickupHouseNo},{" "}
                              {request.pickupZipCode} {request.pickupCity}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className="del_body_title">to:</span>
                            <span className="del_body_info">
                              {request.deliveryStreet} {request.deliveryHouseNo}
                              , {request.deliveryZipCode} {request.deliveryCity}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>Status: </th>
                          <td>
                            <span className="del_body_title">
                              {request.packageStatus}.
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))}
      </section>
    </div>
  );
};

export default ActiveDeliveriesforCourier;
