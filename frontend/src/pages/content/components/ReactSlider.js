import React from "react";
import ReactCardSlider from "react-card-slider-component";
// import { Carousel } from "@trendyol-js/react-carousel";
import  img1  from "../../../assets/card-img/Barplot.png";
import img2 from "../../../assets/card-img/popularity.png";
import img3 from "../../../assets/card-img/facets.png";
import  img4  from "../../../assets/card-img/sunbust.png";
import  img5  from "../../../assets/card-img/Barplot.png";
import  img6  from "../../../assets/card-img/popularity.png";

const slides = [
  {
    image: img1,
    title: "Bar Plot",
    description: "Margin ,Sales and Effcost",
  },
  {
    image:  img2 ,
    title: "Popularity Vs Margin    ",
    description: "Popularity Vs Margin for Brands    ",
  },
  {
    image: img3,
    title: "Facets",
    description: "Facets : Bar Plot with months and year    ",
  },
  {
    image: img4,
    title: "Generalized Analysis",
    description: "Analysis",
  },
  {
    image: img5,
    title: "Bar Plot",
    description: "Margin ,Sales and Effcost",
  },
  {
    image: img6,
    title: "Popularity Vs Margin ",
    description: "Tree Maps",
  },
//   {
//     image: "https://picsum.photos/800/900",
//     title: "This is a seventh title",
//     description: "This is a seventh description",
//   },
];

const Baz = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5em",
        marginBottom: "3em",
      }}
    >
      <ReactCardSlider slides={slides} />
    </div>
  );
};

export default Baz;
