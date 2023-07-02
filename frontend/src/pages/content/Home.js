import React, { useState } from "react";
import "./Content.css";
// import Project from "./Project";
import Buttonz from "./components/Button.js";
import Button2 from "./components/Button_2.js";
import ReactSlider from "./components/ReactSlider.js";

const Home = (props) => {
  const [activeState, setActiveState] = useState("Sales Insights");
  const [activeState2, setActiveState2] = useState("Maps Taxonomic");
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

      <div className="section1" id="analysis">
        <div className="row white-area">
          <div className="column col-home-l">
            {activeState === "Sales Insights" && (
              <div className="Show data">
                <div className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState}</h2>
                </div>
                <p>
                  Explore our website's sales analysis with <br /> charts and
                  graphs to uncover insights on <br /> sales, cost to company,
                  and margin <br /> for business optimization!
                </p>
              </div>
            )}

            {activeState === "Popularity & Margin" && (
              <div className="Show data">
                <div className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState}</h2>
                </div>
                <p>
                  Visualizing Popularity and Margin of Our <br />{" "}
                  Products/Brands Over the Years! Explore Our <br /> Graphical
                  Insights for Informed Business Decisions
                </p>
              </div>
            )}

            {activeState === "Sales Distribution" && (
              <div className="Show data">
                <div className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState}</h2>
                </div>
                <p>
                  Detailed view of distribution based on <br /> popularity,
                  sales, and margin with our <br /> informative and visually
                  appealing tree map.
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

      {/* <div
        className="main-home-text white-area tax-data"
        style={{ marginBottom: 0 }}
      >
        {"Taxonomic"}
      </div> */}

      <div className="section2">
        <div className="row white-area">
          <div className="column col-home-l">
            <Button2 setActiveState={setActiveState2} />
          </div>

          <div className="column col-home-r">
            {activeState2 === "Maps Taxonomic" && (
              <div className="Show data">
                <div className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState2}</h2>
                </div>
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
                <div className="heading-footer ">
                  {/* <img className="footer-logo" src={logo} alt="" /> */}
                  <h2 className="Center">{activeState2}</h2>
                </div>
                <p>
                  Includes the different brands available, <br /> the various
                  products offered under each brand, <br /> the design options
                  available for each product,
                  <br /> the different sizes available, and the various colors
                  in <br />
                  which each product is available. .{" "}
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

      <ReactSlider loggedIn={props.loggedIn} setOpen={props.setOpen} />

      <div className="team-upload">
        <section className="team">
          <div className="main-text-team">Partnerships</div>
          
        </section>
      </div>

      {/* partnership */}
    </>
  );
};

export default Home;
