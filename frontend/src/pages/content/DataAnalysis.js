import React, { useEffect, useState } from "react";
import LiveSearch from "./components/LiveSearch";
import Slider from "./components/Slider";
import SliderReverse from "./components/SliderReverse";
import Graph from "./Graph";

function DataAnalysis(props) {
  const [selectedOption, setSelectedOption] = useState("Select your option");
  const [selectedOptionId, setSelectedOptionId] = useState(0);

  const [valueStart, setValueStart] = React.useState(2014);
  const [valueEnd, setValueEnd] = React.useState(2022);
  // const [selectedCommonYear, setSelectedCommonYear] = useState(valueStart);

  const [displayStart, setDisplayStart] = useState(true);
  const [displayEnd, setDisplayEnd] = useState(false);

  const handleSliderChange = (newValueStart) => {
    setValueStart(newValueStart);
  };
  const handleSliderEndChange = (newValueEnd) => {
    setValueEnd(newValueEnd);
  };

  const handleOptionClick = (item) => {
    setSelectedOption(item.plot);
    setSelectedOptionId(item.id);
  };
  useEffect(() => {
    setSelectedOptionId(0);
    setDisplayStart(true);
    setDisplayEnd(false);
  }, [props.topic]);

  return (
    <>
      {/* <h1> Hraph me hu!</h1>
      <h1> {selectedOptionId}!</h1> */}
      <div className="on-home-bg">
        <div className="main-home-text">{props.activeTopic}</div>
        <div className="main-home-sub-text">
          {props.topic === "data"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            : props.topic === "margin"
            ? "Praesent vel sapien sed elit cursus elementum."
            : props.topic === "maps"
            ? "Nam ullamcorper justo id velit varius, nec luctus lectus lobortis."
            : props.topic === "mapstaxonomic"
            ? "Welcome to our taxonomic maps, the aerial view of our product universe. Zoom in and explore the hidden connections between our categories, and discover new products along the way."
            : props.topic === "taxonomic"
            ? "Welcome to our taxonomic section, where you'll discover an organized and easy-to-navigate world of products, neatly categorized by brand, design, size, and color. Whether you're looking for something specific or simply browsing, our intuitive hierarchy will help you find what you need with ease. Explore our vast collection and experience the convenience of shopping with us."
            : "Welcome to our taxonomic data, the secret sauce of our store. With our detailed categorization system, you'll be able to navigate our collection with ease and discover new products that match your preferences. Whether you're a seasoned shopper or a first-time visitor, our taxonomic data makes your shopping experience hassle-free and enjoyable."}{" "}
        </div>
        <LiveSearch
          topic={props.topic}
          handleOptionClick={handleOptionClick}
          setDisplayStart={setDisplayStart}
          setDisplayEnd={setDisplayEnd}
        />
        {!(displayStart == false && displayEnd == false) && (
          <div>
            {!displayStart && (
              <>
                <div className="slider-select">
                  <div className="slider-label">Start Year</div>
                  <br />
                  <Slider onChange={handleSliderChange} />
                  {/* <div>Selected valueStart: {valueStart}</div> */}
                </div>
              </>
            )}
            {displayEnd && (
              <>
                <div className="slider-select">
                  {!displayStart && (
                    <div className="slider-label">End Year</div>
                  )}
                  {displayStart && (
                    <div className="slider-label">Select Year</div>
                  )}
                  <br />
                  <SliderReverse
                    onChange={handleSliderEndChange}
                    valueStart={valueStart}
                  />
                  {/* <p>Selected valueStart: {valueEnd}</p> */}
                </div>
              </>
            )}
          </div>
        )}
        <Graph
          selectedOption={selectedOption}
          selectedOptionId={selectedOptionId}
          topic={props.topic}
          valueStart={valueStart}
          valueEnd={valueEnd}
        />
      </div>
    </>
  );
}

export default DataAnalysis;
