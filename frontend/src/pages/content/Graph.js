// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Plot from "react-plotly.js";

// function Graph(props) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.post(
//         `http://127.0.0.1:5000/${props.topic}`,

//         {
//           graph: 1, // or 2
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setData(response.data);
//     };
//     fetchData();
//   }, [props.topic]);

//   return (
//     data && (
//       <>

//         <div className="graph-section">
//           {props.selectedOptionId === 0 && (
//             <div className="no-graph">Select any option to start Analysis!</div>
//           )}

//           {props.selectedOptionId === 1 && (
//             <Plot
//               data={JSON.parse(data.plot1).data}
//               layout={{ width: 1000, height: 500, title: props.selectedOption }}
//             />
//           )}
//           {props.selectedOptionId === 2 && (
//             <Plot
//               data={JSON.parse(data.plot2).data}
//               layout={{ width: 1000, height: 500, title: props.selectedOption }}
//             />
//           )}
//           {props.selectedOptionId === 3 && (
//             <Plot
//               data={JSON.parse(data.plot3).data}
//               layout={{ width: 1000, height: 500, title: props.selectedOption }}
//             />
//           )}
//           {props.selectedOptionId === 4 && (
//             <Plot
//               data={JSON.parse(data.plot4).data}
//               layout={{ width: 1000, height: 500, title: props.selectedOption }}
//             />
//           )}
//         </div>
//       </>
//     )
//   );
// }

// export default Graph;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Plot from "react-plotly.js";
// import "./Content.css";

// function Graph(props) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.post(
//         `http://127.0.0.1:5000/${props.topic}`,
//         {
//           graph: 2, // or 2
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setData(response.data);
//     };
//     fetchData();
//   }, [props.topic]);

//   return (
//     data && (
//       <div className="graph-section">
//         {props.selectedOptionId === 0 && (
//           <div className="no-graph">Select any option to start Analysis!</div>
//         )}
//         {props.selectedOptionId > 0 && (
//           <Plot
//             data={JSON.parse(data[`plot${props.selectedOptionId}`]).data}
//             layout={{
//               dragmode: "pan",
//               width: 1150,
//               height: 550,
//               title: props.selectedOption,
//             }}
//             config={{ scrollZoom: true, displaylogo: false, responsive: true }}
//           />
//         )}
//       </div>
//     )
//   );
// }

// export default Graph;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Plot from "react-plotly.js";
// import "./Content.css";

// function Graph(props) {
//   const [plots, setPlots] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.post(
//         `http://127.0.0.1:5000/${props.topic}`,
//         {
//           graph: props.selectedOptionId, // 1 or 2
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const plotsArray = [];
//       for (let i = 1; i <= 4; i++) {
//         if (response.data[`plot${i}`]) {
//           const data = JSON.parse(response.data[`plot${i}`]).data;
//           plotsArray.push(data);
//         }
//       }
//       setPlots(plotsArray);
//     };
//     fetchData();
//   }, [props.topic, props.selectedOptionId]);

//   return (
//     <div className="graph-section">
//       {props.selectedOptionId === 0 && (
//         <div className="no-graph">Select any option to start Analysis!</div>
//       )}
//       {props.selectedOptionId > 0 &&
//         plots.length > 0 &&
//         plots.map((plot, index) => (
//           <>
//             <div className="plotlyi">
//               <Plot
//                 key={index}
//                 data={plot}
//                 layout={{
//                   dragmode: "pan",
//                   autosize: true,

//                   width: 1150,
//                   height: 550,
//                   // title: `${props.selectedOption} - Plot ${index + 1}`,
//                 }}
//                 config={{
//                   scrollZoom: true,
//                   displaylogo: false,
//                   responsive: true,
//                 }}
//               />
//               {/* <br /> */}
//             </div>
//           </>
//         ))}
//     </div>
//   );
// }

// export default Graph;

// import { Row, Col } from 'react-bootstrap';

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Plot from "react-plotly.js";
// import "./Content.css";

// function Graph(props) {
//   const [plots, setPlots] = useState([]);
//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.post(
//         `http://127.0.0.1:5000/${props.topic}`,
//         {
//           graph: props.selectedOptionId, // 1 or 2
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const plotsArray = [];
//       for (let i = 1; i <= 4; i++) {
//         if (response.data[`plot${i}`]) {
//           const data = JSON.parse(response.data[`plot${i}`]).data;
//           plotsArray.push(data);
//           setTitle(JSON.parse(response.data[`plot${i}`]).layout.title.text);
//         }
//       }
//       setPlots(plotsArray);
//     };
//     fetchData();
//   }, [props.topic, props.selectedOptionId]);

//   return (
//     <>
//       {props.selectedOptionId === 0 && (
//         <div className="no-graph">Select any option to start Analysis!</div>
//       )}
//       <div className="graph-section">
//         {props.selectedOptionId > 0 &&
//           plots.length > 0 &&
//           plots.map((plot, index) => (
//             <>
//               <div className="plotlyi">
//                 <Plot
//                   key={index}
//                   data={plot}
//                   layout={{
//                     dragmode: "pan",
//                     // autosize: true,

//                     // width: 600,
//                     // height: 350,
//                     title: title,

//                     // maxWidth:1000
//                   }}
//                   useResizeHandler={true}
//                   style={{
//                     width: "80%",
//                     height: "70%",
//                     overflowWrap: "break-word",
//                     wordWrap: "break-word",
//                     hyphens: "auto",
//                   }}
//                   config={{
//                     scrollZoom: true,
//                     displaylogo: false,
//                     responsive: true,
//                   }}
//                 />
//                 <br />
//               </div>
//             </>
//           ))}
//       </div>
//     </>
//   );
// }

// export default Graph;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./Content.css";

function Graph(props) {
  const [plots, setPlots] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.post(
      `http://127.0.0.1:5000/${props.topic}`,
      {
        graph: props.selectedOptionId, // 1 or 2
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const plotsArray = [];
    for (let i = 1; i <= 4; i++) {
      if (response.data[`plot${i}`]) {
        const data = JSON.parse(response.data[`plot${i}`]).data;
        plotsArray.push(data);
        setTitle(JSON.parse(response.data[`plot${i}`]).layout.title.text);
      }
    }
    setPlots(plotsArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (props.topic && props.selectedOptionId) {
      fetchData();
    }
  }, [props.topic, props.selectedOptionId]);

  return (
    <>
      {props.selectedOptionId === 0 && (
        <div className="no-graph">Select any option to start Analysis!</div>
      )}
      <div className="graph-section">
        {props.selectedOptionId > 0 &&
          (loading ? (
            <div>Loading data...</div>
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
