import React, { useState } from "react";
import "./Content.css";
// import Project from "./Project";
import Buttonz from "./components/Button.js";
import Button_2 from "./components/Button_2.js";
import ReactSlider from "./components/ReactSlider.js";
import DialogBox from "./components/DialogGraph.js";

const Home = () => {
  const [activeState, setActiveState] = useState("Data Analysis");
  const [activeState2, setActiveState2] = useState("Maps Taxonomic");
  return (
    <>
      <div className="on-home-bg">
        <div className="main-home-text">{"RASYOG"}</div>
        <div className="main-home-sub-text">
          This is a comprehensive taxonomic and sales analysis of a departmental
          store. Our team has analyzed and organized the store's data into
          various categories based on similarities and differences, including
          product categories, brand categories, and price categories. We have
          also analyzed sales data to provide insights into product popularity
          and availability. The results of this analysis have been presented in
          a user-friendly interface that is easy to navigate and understand.
          Whether you are a store manager looking to optimize product offerings
          or a customer looking for a more efficient shopping experience, our
          taxonomic and sales analysis can provide valuable insights to enhance
          your decision-making process.{" "}
        </div>
      </div>

      <div className="section1">
        <div className="row white-area">
          <div className="column col-home-l">
            {activeState === "Data Analysis" && (
              <div className="Show data">
                <h2 className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState}</h2>
                </h2>
                <p>
                  Advanced data analysis of sales, <br /> margin, and cost to
                  the company <br />
                  with comprehensive month wise <br /> and year wise
                  visualization charts.
                </p>
              </div>
            )}

            {activeState === "Popularity & Margin" && (
              <div className="Show data">
                <h2 className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState}</h2>
                </h2>
                <p>
                  Comprehensive insights into products <br /> and brands
                  performance based on raw data,
                  <br /> using advanced animated charts
                </p>
              </div>
            )}

            {activeState === "Tree Map" && (
              <div className="Show data">
                <h2 className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState}</h2>
                </h2>
                <p>
                  Detailed view of distribution based <br /> on popularity,
                  sales, and margin <br /> with our informative and visually{" "}
                  <br /> appealing tree map.{" "}
                </p>
              </div>
            )}
          </div>
          <div className="column col-home-r">
            <Buttonz setActiveState={setActiveState} />
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}

      {/*
       */}
      {/*  */}
      {/* new section  */}
      {/*  */}



      <div className="main-home-text white-area tax-data" style={{marginBottom:0}}>{"Taxonomic"}</div>

      <div className="section2">
        <div className="row white-area">
          <div className="column col-home-l">
            <Button_2 setActiveState={setActiveState2} />
          </div>

          <div className="column col-home-r">
            {activeState2 === "Maps Taxonomic" && (
              <div className="Show data">
                <h2 className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState2}</h2>
                </h2>
                <p>
                  a graphical representation of the relationships <br /> between
                  Brands, Products, Design, Size, and Color, <br /> showing how
                  each level relates to the others and <br /> how they are
                  organized within the taxonomy.{" "}
                </p>
              </div>
            )}

            {activeState2 === "Data Taxonomic" && (
              <div className="Show data">
                <h2 className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState2}</h2>
                </h2>
                <p>
                  Includes the different brands available, <br/> the various products
                  offered under each brand, <br/> the design options available for
                  each product,<br/> the different sizes available, and  the various
                  colors in <br/>which each product is available. .{" "}
                </p>
              </div>
            )}
            {/* <DialogBox
              selectedOptionId={2}
              valueStart={2014}
              valueEnd={2017}
              topic={"data"}
            /> */}
          </div>
        </div>
      </div>

      <ReactSlider />
    </>
  );
};

export default Home;
