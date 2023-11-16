import React, { useEffect } from "react";
import "./Footer.css";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo/yoglabs-white.png";
// import jaipurM from "../../assets/logo/jaipur_Modern.png";
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
            <div className="heading-footer">
              {/* Left div sdection here! */}

              <img className="footer-logo" src={logo} alt="" />
              <h2 className="Center">RASYOG</h2>
              {/* <img src={jaipurM} className="svg-login-icon" alt="" /> */}
            </div>
            <div className="footer-heading-sub-txt">
              Fashion AI for Indian Aesthetics (Ras)
            </div>
          </div>
          <div className="column right-col">
            {/* <h2>Powered by YogLabs</h2> */}
            {/* <img src={jaipurM} className="svg-login-icon" alt="" /> */}

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

        <br />
        <br />
      </footer>
    </>
  );
}

export default Footer;
