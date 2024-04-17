import React, { useState } from "react";
import "./Content.css";
// import Project from "./Project";
import ReactSlider from "./components/ReactSlider.js";
import HomeSec from "./components/newHomeSection/Home.js";
import jaipurM from "../../assets/logo/jaipur_Modern.png";
import { motion } from "framer-motion";

const Home = (props) => {
  const [activeState, setActiveState] = useState("Sales Insights"); // section 1 button option!
  const [activeState2, setActiveState2] = useState("Maps Taxonomic"); // section 2 button option!
  return (
    <>
      <div className="on-home-bg">
        <div className="main-home-text">{"RASYOG"}</div>
        <div className="main-home-sub-text color-ras-color-it">
          Fashion AI for Indian Aesthetics (Ras)
        </div>
        <div className="main-home-sub-text">
          Applying AI on Indian Consumer data of Fashion Brands for building
          scientific understanding for Indian Aesthetics and helping better
          decision making for the Fashion Industry. A mutually beneficial
          partnership between the research community and industry based on
          data-driven AI research. In the process also rejuvenating the cultural
          awareness as well as scientific research in the <br /> field of Indian
          Philosophies for Aesthetics (Ras).
          <br />
          <br />
          The first version of RasYog provides a comprehensive taxonomic and
          sales analysis of fashion store data. Leveraging powerful visual
          analytics techniques to easily analyze and organize your data into
          various categories of products, brands and pricing based on
          similarities and differences. Also allows for dynamic temporal
          analytics of sales data to provide insights into both product
          popularity and availability.
        </div>
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* Section 2 --> two divs --> shows which is tiggered!! */}

      {/* New home section */}

      <HomeSec />

      {/* React slider component (TAken from other's Package)*/}
      {/* React slider component */}
      {/* React slider component */}
      {/* React slider component */}

      <ReactSlider loggedIn={props.loggedIn} setOpen={props.setOpen} />
      {/* React slider component */}
      {/* React slider component */}
      {/* React slider component */}

      {/* Section 3 (divides into 2 upper ->Upload data files to backend | lower -> show team members) */}

      {/* (left -> uplaod an excel | csv) */}

      <div className="team-upload">
        <section className="team">
          <div className="main-text-team">Partnerships</div>
          <a href="http://www.jaipurmodern.com/" target="__blank">
            <motion.img
              whileHover={{
                scale: 1.1,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              src={jaipurM}
              className="svg-login-icon-onhomepage-above-footer"
              alt=""
            />
          </a>
        </section>
      </div>

      {/* partnership */}
    </>
  );
};

export default Home;
