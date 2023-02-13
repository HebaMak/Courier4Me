import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Helmet } from "react-helmet";
import Footer from "../../components/footer/Footer.jsx";
import Container from "react-bootstrap/Container";
import "./faq.css";

function Faq() {
  return (
    <>
      <Container id="container">
        <Helmet>
          <title>COURIER4ME | FAQ</title>
        </Helmet>
        <h4 className="title-h4">ABOUT COURIER4ME</h4>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is COURIER4ME?</Accordion.Header>
            <Accordion.Body>
              Courier4me get your delivery request and make it delivered. You do
              nothing, courier4me do everything for you!
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How does it work?</Accordion.Header>
            <Accordion.Body>
              You need to register first, and please login to your account. Then
              all the functionalities are available for you. You can create a
              delivery request whenever you want. One of our couriers will pick
              up your package and deliver it as soon as possible. When your
              package is delivered you will get a notification.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              When can I make a delivery request?
            </Accordion.Header>
            <Accordion.Body>
              You can create a delivery request whenever you want! Mostly our
              couriers are available during the day.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h4 className="title-h4">PERSONAL INFORMATION</h4>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How can I change my details?</Accordion.Header>
            <Accordion.Body>
              From your dashboard you can change your profile information.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Can I change my delivery address?
            </Accordion.Header>
            <Accordion.Body>
              Yes, you can change your address information from your dashboard.
              Please change it before making a delivery request!
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h4 className="title-h4">ORDER</h4>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Can I cancel my delivery request?
            </Accordion.Header>
            <Accordion.Body>
              Yes you can cancel your delivery request before it is picked up.
              Otherwise the delivery cost will charge.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              What if there is something wrong with my delivery?
            </Accordion.Header>
            <Accordion.Body>
              If the problem is about Courier then your delivery request will be
              picked up by another courier without any extra cost. But if the
              problem is about customer or delivery address then Courier4me may
              charge extra cost.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              How can I change the delivery address of my order?
            </Accordion.Header>
            <Accordion.Body>
              You can update your delivery request from your dashboard. Please
              beware! Change the information before the delivery is picked up!
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h4 className="title-h4">PAY</h4>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Which payment methods do you accept?
            </Accordion.Header>
            <Accordion.Body>
              No Cash? No Problem! Courier4me now accepts credit card for
              delivery. You can pay with Credit Card, Apple Pay, Paypal, Revolut
              etc.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h4 className="title-h4">CORONAVIRUS</h4>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Is the delivery contactless?</Accordion.Header>
            <Accordion.Body>
              Contactless Delivery is available as a delivery option. The
              delivery instructions box is for any special directions, including
              the location where you would like the delivery placed. Pre-payment
              and pre-tipping make your contactless delivery more efficient. The
              courier will notify you when the order has arrived and may call
              you (keep your phone handy).
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Footer />
    </>
  );
}

export default Faq;
