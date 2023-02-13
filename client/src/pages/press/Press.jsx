import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/footer/Footer.jsx";
import "./press.css";
import ReactReadMoreReadLess from "react-read-more-read-less";

const Press = () => {
  return (
    <>
      <Helmet>
        <title>COURIER4ME | Press</title>
      </Helmet>
      <div className="press-container">
        <div className="container pb-5 ">
          <h3 className="mb-4 pt-4">Press releases</h3>
          <div className="press-border p-3 mb-5 bg-white ">
            <p className="text-muted mb-3">22.09.2022</p>
            <h3 className="mb-4">
              Delivering Better Access to Health Care with Walgreens
            </h3>
            <p className="text-muted">
              Our partnership with Walgreens is now live to provide free same
              day delivery of Paxlovid. Additionally, the eligibility for this
              initiative has expanded to include anyone living within 15 miles
              of a participating Walgreens; This means that the vast majority of
              Dutch – around 92 percent of the population – can have Paxlovid
              prescriptions delivered right to their doorstep. at no cost to
              them.
              <ReactReadMoreReadLess
                readLessClassName="btn btn-link"
                readMoreClassName="btn btn-link"
                charLimit={0}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
              >
                Today, Coureir4Me and Walgreens announced a new partnership to
                ensure that Paxlovid, an oral COVID-19 treatment, is delivered
                directly to the doorstep of those in need with a free
                prescription. The partnership, which will begin in the coming
                weeks, will provide the option of free distribution of Paxlovid
                to prescription patients in socially vulnerable or underserved
                communities, according to the CDC/ATSDR Social Vulnerability
                Index. -As part of our ongoing efforts to ensure that no
                community is left behind, we are proud to partner with Walgreens
                to provide free Paxlovid delivery to those who need it most,-
                said Rob van Kruijsdijk, Managing Director of Courier4Me. -This
                partnership is another way that Courier4Me technology is helping
                the Dutch recover from the pandemic and make life-saving
                healthcare more accessible.- This initiative will encompass
                Walgreens network of stores in the Netherlands. Courier4Me and
                Walgreens will increase the availability of this initiative
                through advocacy and community-based organizations, healthcare
                provider systems, and national and regional payer agencies to
                effectively reach those in need.
              </ReactReadMoreReadLess>
            </p>
          </div>
          <div className="press-border p-3 mb-5 bg-white ">
            <p className="text-muted mb-3">02.06.2022</p>
            <h3 className="mb-4">
              Get The Best of Food Delivered to Your Doorstep with Nationwide
              Shipping
            </h3>
            <p className="text-muted">
              Ever gotten home from vacation and still craving the pizza you
              tasted that late night in Amsterdam? We have been there. Ever want
              to surprise a friend with her hometown bagels from across the
              country? We are food people at Courier4Me, and we have been there
              too.
              <ReactReadMoreReadLess
                readLessClassName="btn btn-link"
                readMoreClassName="btn btn-link"
                charLimit={0}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
              >
                Now with Nationwide shipping, consumers in the Netherlands can
                meet their nationwide demand from beloved retailers in
                Amsterdam, Rotterdam and Utrecht (more cities coming soon) with
                just a few taps on the Uber Eats app. In recent years
                (especially during the two-year quarantine period when travel
                has been reduced), consumers have shared their desire to bring
                specialty foodstuffs directly to their homes. But it is not just
                something consumers want. We have clearly heard sellers
                willingness to diversify their offerings and reach new
                consumers. To order a nationwide shipment, open your Courier4Me
                app and click the Make Request tile.
              </ReactReadMoreReadLess>
            </p>
          </div>
          <div className="press-border p-3 mb-5 bg-white ">
            <p className="text-muted mb-3">28.07.2021</p>
            <h3 className="mb-4">
              Partnering with FTDs ProFlowers to deliver florals on-demand
            </h3>
            <p className="text-muted">
              We are excited to announce our exclusive partnership with FTD,
              LLC, a leader in the flower industry for over a century, to
              provide on-demand flower delivery to Courier4Me customers
              nationwide. This one-of-a-kind deal marks Courier4Mes first
              national flower partnership, making Courier4Me the first of its
              kind to provide on-demand flower delivery to customers nationwide.
              <ReactReadMoreReadLess
                readLessClassName="btn btn-link"
                readMoreClassName="btn btn-link"
                charLimit={0}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
              >
                From Wednesday 28 July, customers in Amsterdam, Rotterdam,
                Utrecht, Sneek, The Hague, Leiden and more will be able to order
                a selection of beautiful flower arrangements through FTDs
                ProFlower brand and benefit from the companys national network
                of local florists. directly from the Courier4Me app. The offer
                will continue to expand to additional cities throughout the year
                and will be available nationwide in early 2022. Courier4Me
                owners will also enjoy 5% off on eligible orders over $15 and an
                unlimited Delivery Fee of $0. -When it comes to being an
                on-demand marketplace, it is all about meeting our customers
                needs, so flowers are a natural progression for Courier4Me.- Raj
                Beri, Courier4Mes Head of Global Groceries and New Industries,
                said. “FTD has been a leader in the flower industry for over a
                century. By combining their expertise with our best-in-class
                logistics technology, we are able to support FTDs extensive
                network of local florists and make Courier4Me a leader in
                providing on-demand flower delivery to customers nationwide.-
              </ReactReadMoreReadLess>
            </p>
          </div>
          <div className="press-border p-3 mb-5 bg-white ">
            <p className="text-muted mb-3">20.05.2021</p>
            <h3 className="mb-4">Your Starbucks is Arriving Now…</h3>
            <p className="text-muted">
              At Courier4Me we are always looking for new ways to offer our
              customers the widest selection of food and drink from the best
              restaurants. It will not surprise all coffee lovers that coffee is
              one of our most sought after beverages, with orders increasing by
              more than 255% compared to last year.
              <ReactReadMoreReadLess
                readLessClassName="btn btn-link"
                readMoreClassName="btn btn-link"
                charLimit={0}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
              >
                That is why we are excited to announce that we are expanding our
                Amsterdam pilot with Starbucks to bring more Courier4Me
                customers the food and drink they love. We are live in Rotterdam
                from today and will launch in the next few weeks in Utrecht, The
                Hague, Groningen and Leiden. Yes - that means you can enjoy it
                wherever you want, whether it is Caramel Macchiato or Iced
                Blonde Americano.
              </ReactReadMoreReadLess>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Press;
