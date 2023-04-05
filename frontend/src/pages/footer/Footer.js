import React from "react";
import "./Footer.css";
// import logo from "../../assets/logo/logo-white.png";
function Footer() {
  return (
    <>
      <footer className="footer-main">
        <br />
        <br />
        <br />

        <div className="row">
          <div className="column">
            <h2 className="heading-footer">
              {/* <img className="footer-logo" src={logo} alt="" /> */}
              <h2 className="Center">RASYOG</h2>
            </h2>
            <p>
              Our team conducted a taxonomic and sales analysis <br /> of a
              departmental store, organizing data into categories <br /> and
              providing insights into product popularity and availability.{" "}
              <br /> The results are presented in a user-friendly interface that
              can <br /> enhance decision-making for store managers and
              customers.
            </p>
          </div>
          <div className="column">
            <h2>Something Here</h2>
            <p>Some text..</p>
            <p>Some text..</p>
            <p>Some text..</p>
            <p>Some text..</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="column">
            <h3 className="yoglabs">
              <span>R</span>as
              <span>Y</span>og © {new Date().getFullYear()}
              {/* <p>Let's get in touch on any of these platforms.</p> */}
            </h3>
          </div>
          <div className="column">
            <h5>YogLabs</h5>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
