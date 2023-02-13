import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch.js";
import "./deliveryRequests.css";
import Accordion from "react-bootstrap/Accordion";
import Loading from "../../components/loadErr/Loading";
import Error from "../../components/loadErr/Error";
import { Modal, Button } from "react-bootstrap";

const deliveryRequests = () => {
  const [delivery, setDelivery] = useState({});
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const onSuccess = () => {
    setDelivery((prev) => ({
      ...prev,
      notificationForCourier: "You got this delivery",
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
      (request) => request.courierEmail === "" && request.email !== user.email
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

  const selectDelivery = (selectedId) => {
    const selectedRequest = deliveryRequests.find(
      (request) => request._id === selectedId
    );
    setSelectedRequest(selectedRequest);
    isLoadingGet;
    setEnabled(!enabled);
    setDelivery({
      ...selectedRequest,
      courierEmail: user.email,
      requestStatus: "active",
      packageStatus: "waiting for picked up from sender",
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    performFetchGet();
    return cancelFetch();
  }, [delivery]);

  return (
    <main className=" deliveries courier-deliveries pending-deliveries-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to deliver this delivery?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 title={selectedRequest && selectedRequest.email}>
            Sender:{" "}
            {selectedRequest &&
              selectedRequest.email.substring(
                0,
                selectedRequest.email.indexOf("@")
              )}
          </h6>
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
      <div className="container">
        <h1 className="pending-delivery-title">Pending Deliveries</h1>
        <section className="request-list">
          {errorGet && <Error text={`Something went wrong! ${error}`} />}
          {(isLoadingGet && (
            <Loading text="All deliveries are coming, We're testing your patience." />
          )) ||
            (deliveryRequests.length === 0 && (
              <>
                <h3 className="no_del_msg">There No deliveries Yet!...</h3>
                <Loading />
              </>
            ))}
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
                          <span className="del_info">
                            {request.pickupCity},
                          </span>
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
                            <td className="text-capitalize">
                              {request.email.substring(
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
                                    <span className="del_body_title">
                                      a/an:
                                    </span>
                                    <span className="del_body_info">
                                      {request.shipment},
                                    </span>
                                  </p>
                                </div>
                                <div className="body_part">
                                  <p>
                                    <span className="del_body_title">
                                      {" "}
                                      with size:
                                    </span>
                                    <span className="del_body_info">
                                      {request.size},
                                    </span>
                                  </p>
                                </div>
                                <div className="body_part">
                                  <p>
                                    <span className="del_body_title">
                                      & weight:
                                    </span>
                                    <span className="del_body_info">
                                      {request.weight}kg
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>Delivery: </th>
                            <td>
                              <p>
                                <span className="del_body_title">from:</span>
                                <span className="del_body_info">
                                  {request.pickupStreet}, {request.pickupCity}
                                </span>
                              </p>
                              <p>
                                <span className="del_body_title">to:</span>
                                <span className="del_body_info">
                                  {request.deliveryStreet},
                                  {request.deliveryCity}
                                </span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="button_container">
                        <button
                          onClick={() => {
                            selectDelivery(request._id);
                          }}
                        >
                          Select
                        </button>
                      </div>
                      {request.notificationForCourier !== "" && (
                        <div>{request.notificationForCourier}</div>
                      )}
                      {error && <p className="error-msg">an error is found</p>}
                      {isLoading && <Loading text="Sending request..." />}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ))}
        </section>
      </div>
    </main>
  );
};

export default deliveryRequests;
