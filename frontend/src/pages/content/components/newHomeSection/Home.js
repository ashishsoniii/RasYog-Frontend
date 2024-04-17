import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="foodAnalysis" className="foodAnalysis">
      <div className="home-intro">
        {/* badge */}
        <div className="badge">
          <div className="badge-btn">Analysis</div>
        </div>
        {/* text */}

        <div className="home-textt">Powered By YogLabs</div>
        <div className="arrange-this-item">
          <div className="home-sub-small-textt">
            Analyse the Fashion Data with Power of RasYog's Algo! & Sell what
            customer want!
          </div>
        </div>
        <div className="home-textt-small-small-blured">
          Unveiling the All-Time Best Seller - Pajama!
        </div>

        <div className="cardssss">
          {/* card1  */}
          <div className="card1">
            <div className="card1-text">
              <div className="card1-text1">Sales Insight</div>
              <div className="card1-text2">
                Explore our website's sales analysis with charts and graphs to
                uncover insights on sales, cost to company, and margin for
                business optimization!
              </div>
              <div className="btn-btn">
                <Link to="/matrix">
                  {/* <div className="btn-text">Explore</div> */}
                </Link>
              </div>
            </div>
          </div>

          {/* /card 2 */}
          {/* /card 2 */}
          {/* /card 2 */}
          {/* /card 2 */}
          <div className="card2">
            <div className="card1-text">
              <div className="card1-text1">Popularity & Margin</div>
              <div className="card1-text2">
                Visualizing Popularity and Margin of Our Products/Brands Over
                the Years! Explore Our Graphical Insights for Informed Business
                Decisions
              </div>
              <div className="btn-btn">
                <Link to="/nonTemporal">
                  {/* <div className="btn-text">Explore</div> */}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <br /> */}

        {/* card line2222222222222222222 */}
        {/* card line2222222222222222222 */}
        {/* card line2222222222222222222 */}
        {/* card line2222222222222222222 */}
        {/* card line2222222222222222222 */}

        <div className="cardssss">
          {/* card1  */}
          <div className="card2">
            <div className="card1-text">
              <div className="card1-text1">Sales Distribution</div>
              <div className="card1-text2">
                Detailed view of distribution based on popularity, sales, and
                margin with our informative and visually appealing tree map.
              </div>
              <div className="btn-btn">
                <Link to="/nonTemporal">
                  {/* <div className="btn-text">Explore</div> */}
                </Link>
              </div>
            </div>
          </div>

          {/* /card 2 */}
          {/* /card 2 */}
          {/* /card 2 */}
          {/* /card 2 */}
          <div className="card1">
            <div className="card1-text">
              <div className="card1-text1">Maps Taxonomic</div>
              <div className="card1-text2">
                A graphical representation of the relationships between Brands,
                Products, Design, Size, and Color, showing how each level
                relates to the others and how they are organized within the
                taxonomy.
              </div>
              <div className="btn-btn">
                <Link to="/FPM">
                  {/* <div className="btn-text">Explore</div> */}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cardssss">
          {/* card1  */}
          <div className="card2">
            <div className="card1-text">
              <div className="card1-text1">Data Taxonomic</div>
              <div className="card1-text2">
                Includes the different brands available, the various products
                offered under each brand, the design options available for each
                product, the different sizes available, and the various colors
                in which each product is available. .
              </div>
              <div className="btn-btn">
                <Link to="/forcast">
                  {/* <div className="btn-text">Explore</div> */}
                </Link>
              </div>
            </div>
          </div>

          {/* /card 2 */}
          {/* /card 2 */}
          {/* /card 2 */}
          {/* /card 2 */}
        </div>

        {/* edcm */}
      </div>
    </div>
  );
}

export default Home;
