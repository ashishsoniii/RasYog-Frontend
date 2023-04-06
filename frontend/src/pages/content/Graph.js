import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./Content.css";
import { motion } from "framer-motion";

function Graph(props) {
  const [plots, setPlots] = useState([]);
  const [layout, setLayouts] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      // const response = await axios.post(
      // `http://127.0.0.1:5000/${props.topic}`,
      const response = await axios.post(
        `https://yoglabs.pythonanywhere.com/${props.topic}`,
        {
          graph: props.selectedOptionId, // 1 or 2
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response.data);
      const plotsArray = [];
      let title = "No Title"; // Set a default title in case none is found
      for (let i = 1; i <= 4; i++) {
        if (response.data[`plot${i}`]) {
          const data = JSON.parse(response.data[`plot${i}`]).data;
          const layout = JSON.parse(response.data[`plot${i}`]).layout;
          if (layout && layout.title && layout.title.text) {
            title = layout.title.text;
          }

          plotsArray.push(data);
        }
      }
      setLayouts(layout);
      setTitle(title);

      setPlots(plotsArray);
      setLoading(false);
      setError(false);
    } catch (error) {
      // console.log(error);
      setError(true);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    setLoading(false);
    setPlots([]);
  }, [props.topic]);

  useEffect(() => {
    if (props.selectedOptionId) {
      setLoading(true);
      setPlots([]);

      fetchData();
    }
    // eslint-disable-next-line
  }, [props.selectedOptionId]);

  // useEffect(() => {
  //   props.setSelectedOptionId(1); // set selectedOptionId to 0 on topic change
  //   if (props.topic && props.selectedOptionId) {
  //     setLoading(true);
  //     fetchData();
  //   }
  // }, [props.topic, props.selectedOptionId]);

  return (
    <>
      {props.selectedOptionId === 0 && (
        <div className="no-graph">Select any option to start Analysis!</div>
      )}
      <div className="graph-section">
        {props.selectedOptionId > 0 &&
          (loading ? (
            <motion.div
              className="boxi no-graph"
              animate={{
                scale: [1, 1.6, 1.6, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["10%", "10%", "50%", "50%", "10%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            ></motion.div>
          ) : error ? (
            <div>Error fetching data. Please try again later.</div>
          ) : (
            plots.length > 0 &&
            plots.map((plot, index) => (
              <>
                <div className="plotlyi">
                  <Plot
                    key={index}
                    data={plot}
                    layout={{
                      // layout: layout,
                      dragmode: "pan",
                      title: title,
                      titlefont: {
                        size: "1px", // set the desired font size here
                      },
                    }}
                    useResizeHandler={true}
                    style={{
                      width: "80%",
                      height: "70%",
                      overflowWrap: "break-word",
                      wordWrap: "break-word",
                      hyphens: "auto",
                    }}
                    config={{
                      scrollZoom: true,
                      displaylogo: false,
                      responsive: true,
                    }}
                  />
                  <br />
                </div>
              </>
            ))
          ))}
      </div>
    </>
  );
}

export default Graph;
