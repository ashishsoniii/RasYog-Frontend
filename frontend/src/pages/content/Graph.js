import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./Content.css";

function Graph(props) {
  const [plots, setPlots] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/${props.topic}`,
        // const response = await axios.post(
        //   `http://yoglabs.pythonanywhere.com/${props.topic}`,
        {
          graph: props.selectedOptionId, // 1 or 2
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

        console.log(response.data);
      const plotsArray = [];
      for (let i = 1; i <= 4; i++) {
        if (response.data[`plot${i}`]) {
          const data = JSON.parse(response.data[`plot${i}`]).data;
          const title = JSON.parse(response.data[`plot${i}`]).layout.title.text; // Move setTitle here
          plotsArray.push(data);
          setTitle(title);
        }
      }

      setPlots(plotsArray);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (props.topic && props.selectedOptionId) {
      setLoading(true);
      fetchData();
    }
  }, [props.topic, props.selectedOptionId]);

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
            <div>Loading data...</div>
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
                      dragmode: "pan",
                      title: title,
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
