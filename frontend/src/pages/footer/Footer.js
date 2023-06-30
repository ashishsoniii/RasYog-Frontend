import React, { useEffect } from "react";
import "./Footer.css";
import { NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/logo/logo-white.png";
function Footer() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const handleNavLinkClick = () => {
    window.scrollTo(0, 0);
  };

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
            Our team conducted a taxonomic and sales analysis <br /> of a
            departmental store, organizing data into categories <br /> and
            providing insights into product popularity and availability. <br />{" "}
            The results are presented in a user-friendly interface that can{" "}
            <br /> enhance decision-making for store managers and customers.
          </div>
          <div className="column right-col">
            <h2>Powered by YogLabs</h2>
            <NavLink
              className="footer-links-f1"
              to="/team"
              onClick={handleNavLinkClick}
              activeclassname=""
            >
              Meet Our Team
            </NavLink>
            <a className="footer-links-f2" href="https://yoglabs.ai">
              yoglabs.ai
            </a>
            <a className="footer-links-f1" href="mailto:info.ras@yoglabs.ai">
              info.ras@yoglabs.ai
            </a>
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
