import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function LiveSearch(props) {
  const [plotName, setPlotName] = useState([]);
  const [displayOption, setDisplayOption] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your option");
  const [selectedOptionId, setSelectedOptionId] = useState(0);

  const selectMenuRef = useRef(null);

  const handleOptionClick = (item) => {
    setSelectedOption(item.plot);
    setSelectedOptionId(item.id);
    props.handleOptionClick(item);
    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption("Select your option");
    setSelectedOptionId(0);
  }, [props.topic]); // reset the state variables when props.topic changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/store?id=${props.topic}`
        );
        // const response = await axios.get(`http://yoglabs.pythonanywhere.com/store?id=${props.topic}`);
        const { plot_name, display_option } = response.data;
        setPlotName(plot_name);
        setDisplayOption(display_option);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.topic]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectMenuRef.current &&
        !selectMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [selectMenuRef]);

  return (
    <div>
      <div className="select-container">
        <div
          className={`select-menu ${isOpen ? "active" : ""}`}
          ref={selectMenuRef}
        >
          <button className="select-btn" onClick={() => setIsOpen(!isOpen)}>
            <span className="sBtn-text">{selectedOption}</span>
            <i className="bx bx-chevron-down"></i>
          </button>
          <ul className="options">
            {plotName.map((item) => (
              <li
                className="option"
                key={item.id}
                onClick={() => {
                  handleOptionClick(item);
                }}
              >
                <span className="option-color"></span>
                <span className="option-text">{item.plot}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LiveSearch;
