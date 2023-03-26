import React, { useEffect, useState } from "react";
import LiveSearch from "./components/LiveSearch";
import Graph from "./Graph";

function DataAnalysis(props) {
  const [selectedOption, setSelectedOption] = useState("Select your option");
  const [selectedOptionId, setSelectedOptionId] = useState(0);


  const handleOptionClick = (item) => {
    setSelectedOption(item.plot);
    setSelectedOptionId(item.id);
  };

  return (
    <>
      {/* <h1> Hraph me hu!</h1>
      <h1> {selectedOptionId}!</h1> */}
      <div className="on-home-bg">
        <div className="main-home-text">{props.activeTopic}</div>
        <div className="main-home-sub-text">
          {props.topic} Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Eveniet odit quo, maiores magni quod consequatur recusandae
          officia, sequi exercitationem, quos quaerat unde dolor accusamus
          corporis commodi dolores explicabo incidunt ducimus nulla ab? At
          doloribus dolores nam repellat sit sed eveniet nesciunt, est ratione
          alias vel consequatur necessitatibus, atque quos provident.
        </div>
        <LiveSearch topic={props.topic} handleOptionClick={handleOptionClick} />
        <Graph
          selectedOption={selectedOption}
          selectedOptionId={selectedOptionId}
          topic={props.topic} 
        />
      </div>
    </>
  );
}

export default DataAnalysis;
