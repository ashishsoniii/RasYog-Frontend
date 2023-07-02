import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
// import logo from "../../assets/logo/logo-no-background.png";
// import logo from "../../assets/logo/rasyog-logo-yog.png";
import logo from "../../assets/logo/YOGLABS-logo.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const UserContext = React.createContext();

const Navbar2 = (props) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const menuRef = useRef();

  const handleMenuClick = () => {
    setShowMediaIcons(!showMediaIcons);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMediaIcons(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavLinkClick = () => {
    const analysisSection = document.getElementById("analysis");
    if (analysisSection) {
      analysisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <NavLink to="/">
            <motion.img
              whileHover={{
                scale: 1.3,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="logo-img"
              src={logo}
              alt=""
            ></motion.img>{" "}
          </NavLink>
        </div>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
          ref={menuRef}
        >
          <ul>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/"
                activeclassname="active"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/#analysis"
                activeclassname="active"
                onClick={handleNavLinkClick}

              >
                Fashion Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link nav-link-ltr"
                to="/team"
                activeclassname="active"
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <div onClick={handleMenuClick}>
              <GiHamburgerMenu style={{ color: "black" }} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
