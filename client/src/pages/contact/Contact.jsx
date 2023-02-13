import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Footer from "../../components/footer/Footer";
import contactVideo from "../../assets/contactVideo.mp4";
import { IconContext } from "react-icons/lib";
import { GiBrain, GiRaven, GiSmokeBomb } from "react-icons/gi";
import { AiOutlineMail } from "react-icons/ai";
import SignButton from "../../components/buttons/SignButton";
import useFetch from "../../hooks/useFetch.js";
import { AuthContext } from "../../context/AuthContext";
import "./contact.css";

const Contact = () => {
  const [formEmail, setFormEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageText, setMessageText] = useState("");

  const { user } = useContext(AuthContext);

  // no need to this user already contains all data --------------
  let userEmail = "";
  if (user !== null) {
    userEmail = user.email;
  }
  //--------------------------------------------------------------

  const onSuccess = () => {
    setFormEmail("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setMessageText("");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/message/create",
    onSuccess
  );

  //no need to this code user comes from context containing al data needed -----
  const { performFetch: performFetchGet } = useFetch("/user", (response) => {
    const userInfo = response.result.find((user) => user.email === userEmail);
    setFormEmail(userInfo.email);
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
  });
  //------------------------------------------------------------------------------

  useEffect(() => {
    performFetchGet();
    return cancelFetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: {
          email: formEmail,
          firstName,
          lastName,
          phoneNumber,
          messageText,
        },
      }),
    });
  };

  //we can make an inline conditional instead---------
  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div>Error while trying to send message: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Sending message...</div>;
  }
  //--------------------------------------------------------


  return (
    <>
      <Helmet>
        <title>COURIER4ME | Contact</title>
      </Helmet>
      <main className="contactPage row pt-4 pb-5 mx-0 d-flex">
        <article className="col-12 col-lg-7 px-5">
          <section className="contactTextContainer">
            <h3 className="text-center">How can you contact with us?</h3>
            <p>Some possible ways you can contact us: </p>
            <div className="contactIconsContainer d-flex justify-content-space-between mt-2 mb-4">
              <div className="d-flex flex-column align-items-center me-2">
                <IconContext.Provider value={{ size: "80px" }}>
                  <GiBrain className="contactIcons" />
                </IconContext.Provider>
                <h5 className="text-center">Telepathy</h5>
                <p>
                  {" "}
                  Unfortunately, our employees do not have the ability to
                  communicate telepathically yet. But our studies on this
                  subject continue.
                </p>
              </div>
              <div className="d-flex flex-column align-items-center mx-2">
                <IconContext.Provider value={{ size: "80px" }}>
                  <GiRaven className="contactIcons" />
                </IconContext.Provider>
                <h5 className="text-center">Message Raven</h5>
                <p>
                  {" "}
                  Experiences from the Game of Thrones series show that ravens
                  can be shot with arrow or become prey to hawks on the way. Not
                  recommended!
                </p>
              </div>
              <div className="d-flex flex-column align-items-center ms-2">
                <IconContext.Provider value={{ size: "80px" }}>
                  <GiSmokeBomb className="contactIcons" />
                </IconContext.Provider>
                <h5 className="text-center">Smoke Signal</h5>
                <p>
                  {" "}
                  To protect our planet, we must save the trees, minimize using
                  of fossil fuels and carbon dioxide emissions. Do not use
                  smoke!
                </p>
              </div>
            </div>
            <h4 className="text-center">So, what can you do?</h4>
            <p>
              Best of all, use phone or email to contact us. You can also
              contact us by filling out the contact form below.
            </p>
            <div className="realContactIconsContainer d-flex justify-content-center mt-2 mb-4">
              <a
                href="mailto:courier4me.2023@gmail.com"
                className="d-flex flex-column align-items-center ms-2"
              >
                <IconContext.Provider value={{ size: "48px" }}>
                  <AiOutlineMail className="realContactIcons" />
                </IconContext.Provider>
                <h5 className="text-center my-3">courier4me.2023@gmail.com</h5>
              </a>
            </div>
          </section>
          <section className="d-flex justify-content-center mb-5">
            <Form className="formContainer" onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingFirstName"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingLastName"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPhoneNumber"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Please write your phone"
                />
              </FloatingLabel>
              <FloatingLabel
                className="formFloatingTextarea mb-3"
                controlId="floatingMessage"
                label="Message"
              >
                <Form.Control
                  as="textarea"
                  name="messageText"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Message"
                />
              </FloatingLabel>
              <SignButton type="submit" title="Send" />
            </Form>
          </section>
          <div className="statusComponent">{statusComponent}</div>
        </article>
        <article className="col-12 col-lg-5 px-4 mb-3">
          <section className="videoSection d-flex justify-content-center">
            <video
              className="w-100"
              src={contactVideo}
              autoPlay
              loop
              muted
            ></video>
          </section>
          <section className="d-flex justify-content-center">
            <div className="w-100">
              <h4 className="text-center">Do you want to visit us?</h4>
              <p>
                Come to Overhoeksplein 2, 1031 KS Amsterdam. Maybe we cannot
                offer you caviar, shrimp or Peking duck with orange sauce. But
                we have enough tea and coffee to turn the Sahara Desert into the
                Pacific Ocean.
              </p>
              <div className="contactMap">
                <iframe
                  className="w-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1217.6116276196035!2d4.901690226140533!3d52.38450301457261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609b469af6db1%3A0xaaaba4cbdaddfa60!2sOverhoeksplein%2C%20Amsterdam!5e0!3m2!1str!2snl!4v1672073289808!5m2!1str!2snl"
                  height="600"
                ></iframe>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
