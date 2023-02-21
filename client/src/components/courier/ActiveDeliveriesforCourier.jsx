import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch.js";
import Accordion from "react-bootstrap/Accordion";
import { Modal, Button } from "react-bootstrap";

const ActiveDeliveriesforCourier = () => {
  const [delivery, setDelivery] = useState({});
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [show, setShow] = useState(false);
  const [modalQuestion, setModalQuestion] = useState("");
  const { user } = useContext(AuthContext);
  const onSuccess = () => {
    setDelivery((prev) => ({
      ...prev,
      notificationForCourier: "package status change",
    }));
  };

  const { performFetch, cancelFetch, error, isLoading } = useFetch(
    `/delivery/${delivery._id}`,
    onSuccess
  );

  const {
    performFetch: performFetchGet,
    error: errorGet,
    isLoading: isLoadingGet,
  } = useFetch("/delivery", (response) => {
    const requests = response.result.filter(
      (request) =>
        request.courierEmail === user.email &&
        (request.requestStatus === "active" ||
          request.requestStatus === "pending")
    );
    setDeliveryRequests(requests);
  });

  const handleRequest = (e) => {
    e.preventDefault();
    performFetch({
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        delivery: {
          _id: delivery.id,
          email: delivery.email,
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
    handleClose();
  };

  const selectPickedup = (selectedId) => {
    const selectedRequest = deliveryRequests.find(
      (request) => request._id === selectedId
    );
    setSelectedRequest(selectedRequest);
    setDelivery({ ...selectedRequest, packageStatus: "on the way" });
    setShow(true);
    setModalQuestion("You picked up this delivery from sender!");
  };
  const selectCancelled = (selectedId) => {
    const selectedRequest = deliveryRequests.find(
      (request) => request._id === selectedId
    );
    setSelectedRequest(selectedRequest);
    setDelivery({
      ...selectedRequest,
      packageStatus: "cancelled",
      requestStatus: "passive",
    });
    setShow(true);
    setModalQuestion("Are you sure about to cancel this delivery?");
  };

  const selectDelivered = (selectedId) => {
    const selectedRequest = deliveryRequests.find(
      (request) => request._id === selectedId
    );
    setSelectedRequest(selectedRequest);
    setDelivery({
      ...selectedRequest,
      packageStatus: "delivered",
      requestStatus: "passive",
    });
    setShow(true);
    setModalQuestion("You delivered this delivery!");
  };
  const selectCannotBeDelivered = (selectedId) => {
    const selectedRequest = deliveryRequests.find(
      (request) => request._id === selectedId
    );
    setDelivery({
      ...selectedRequest,
      packageStatus: "cannot be delivered",
      requestStatus: "passive",
    });
    setSelectedRequest(selectedRequest);
    setShow(true);
    setModalQuestion("You couldn't deliver this delivery!");
  };
  const handleClose = () => setShow(false);

  useEffect(() => {
    performFetchGet();
    return cancelFetch();
  }, [delivery]);

  return (
    <div className="container active-dels-courier">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalQuestion}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Sender: {selectedRequest && selectedRequest.email}</h6>
          <h6>
            From: {selectedRequest && selectedRequest.pickupStreet},{" "}
            {selectedRequest && selectedRequest.pickupCity}
          </h6>
          <h6>
            To: {selectedRequest && selectedRequest.deliveryStreet},{" "}
            {selectedRequest && selectedRequest.deliveryCity}
          </h6>
        </Modal.Body>
        <Modal.Footer style={{ paddingBottom: 40 }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(e) => handleRequest(e)}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
      <h4 className="pending-delivery-title mb-4">
        Active Deliveries You Must Distribute
      </h4>
      <section className="request-list">
        {deliveryRequests && deliveryRequests.length === 0 && (
          <h5>You have not any active Deliveries yet.</h5>
        )}
        {isLoadingGet && <p>Loading...</p>}
        {errorGet && <p>Something went wrong! {error}</p>}
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
                          <th>Sender: </th>
                          <td
                            title={request && request.email}
                            className="text-capitalize"
                          >
                            {request.email &&
                              request.email.substring(
                                0,
                                request.email.indexOf("@")
                              )}
                          </td>
                        </tr>
                        <tr>
                          <th>Package info: </th>
                          <td>
                            <div className="accordion_body_content">
                              <div className="body_part">
                                <p>
                                  <span className="del_body_title">a/an:</span>
                                  <span className="del_body_info">
                                    {request.shipment},
                                  </span>
                                </p>
                              </div>
                              <div className="body_part">
                                <p>
                                  <span className="del_body_title">
                                    {" "}
                                    ,size:
                                  </span>
                                  <span className="del_body_info">
                                    {request.size} (dm<sup>3</sup>/lt),
                                  </span>
                                </p>
                              </div>
                              <div className="body_part">
                                <p>
                                  <span className="del_body_title">
                                    & weight:
                                  </span>
                                  <span className="del_body_info">
                                    {request.weight} kg
                                  </span>
                                </p>
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
                          <th rowSpan={4}>Delivery: </th>
                          <td>
                            <span className="del_body_title">from:</span>
                            <span className="del_body_info">
                              {request.pickupStreet} {request.pickupHouseNo},{" "}
                              {request.pickupZipCode} {request.pickupCity}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <a
                            className="google_maps"
                            href={`https://www.google.com/maps/place/${request.pickupStreet}+${request.pickupHouseNo},+${request.pickupCity}`}
                          >
                            Show Location
                          </a>
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
                          <a
                            className="google_maps"
                            href={`https://www.google.com/maps/place/${request.deliveryStreet}+${request.deliveryHouseNo},+${request.deliveryCity}`}
                          >
                            Show Location
                          </a>
                        </tr>
                        <tr>
                          <th>Status:</th>
                          <td>{request.requestStatus}.</td>
                        </tr>
                        <tr>
                          <th>Package status:</th>
                          <td>{request.packageStatus}.</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="button_container">
                      <button
                        onClick={() =>
                          request.packageStatus ===
                          "waiting for picked up from sender"
                            ? selectPickedup(request._id)
                            : selectDelivered(request._id)
                        }
                      >
                        {request.packageStatus ===
                        "waiting for picked up from sender"
                          ? "Picked Up"
                          : "Delivered"}
                      </button>
                      <button
                        onClick={() =>
                          request.packageStatus ===
                          "waiting for picked up from sender"
                            ? selectCancelled(request._id)
                            : selectCannotBeDelivered(request._id)
                        }
                      >
                        {request.packageStatus ===
                        "waiting for picked up from sender"
                          ? "Cancel"
                          : "Cannot Be Delivered"}
                      </button>
                    </div>
                    {error && (
                      <p className="error-msg">Something went wrong! {error}</p>
                    )}
                    {isLoading && (
                      <p className="error-msg">Sending request...</p>
                    )}
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
