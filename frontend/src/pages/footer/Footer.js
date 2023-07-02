import React, { useEffect } from "react";
import "./Footer.css";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo/yoglabs-white.png";
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
              <img className="footer-logo" src={logo} alt="" />
              <h2 className="Center">RASYOG</h2>
            </h2>
            Fashion AI for Indian Aesthetics (Ras)
          </div>
          <div className="column right-col">
            {/* <h2>Powered by YogLabs</h2> */}
            <div className="flex-lgao-footer-meh">
              <NavLink
                className="footer-links-f1"
                to="/"
                onClick={handleNavLinkClick}
                activeclassname=""
              >
                Home
              </NavLink>
              <NavLink
                className="footer-links-f1"
                to="#analysis"
                onClick={handleNavLinkClick}
                activeclassname=""
              >
                Login
              </NavLink>
              <NavLink
                className="footer-links-f1"
                to="#analysis"
                onClick={handleNavLinkClick}
                activeclassname=""
              >
                Fashion Analytics
              </NavLink>
              <NavLink
                className="footer-links-f1"
                to="/team"
                onClick={handleNavLinkClick}
                activeclassname=""
              >
                Meet Our Team
              </NavLink>
            </div>
          </div>
        </div>
        {/* <hr />
        <div className="row">
          <div className="column">
            <h3 className="yoglabs">
              <span>R</span>as
              <span>Y</span>og © {new Date().getFullYear()} */}
        {/* <p>Let's get in touch on any of these platforms.</p> */}
        {/* </h3>
          </div> */}
        {/* <div className="column">
            <h5>YogLabs</h5>
          </div> */}
        {/* </div> */}
        <br />
        <br />
      </footer>
    </>
  );
}

export default Footer;
