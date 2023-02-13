import React from "react";

import Footer from "../../components/footer/Footer";
import FirstSec from "../../components/homepage_sections/FirstSec";
import Services from "../../components/homepage_sections/Services";
import AppWorks from "../../components/homepage_sections/AppWorks.jsx";
import WhyUs from "../../components/homepage_sections/WhyUs";
import { Helmet } from "react-helmet";

import TEST_ID from "./Home.testid.js";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>COURIER4ME | Home</title>
      </Helmet>
      <div data-testid={TEST_ID.container}>
        <FirstSec />
        <Services />
        <AppWorks />
        <WhyUs />
        <Footer />
      </div>
    </>
  );
};

export default Home;
