import React from "react";
import ReactCardSlider from "react-card-slider-component";
// import { Carousel } from "@trendyol-js/react-carousel";
import img1 from "../../../assets/card-img/Barplot.png";
import img2 from "../../../assets/card-img/popularity.png";
import img3 from "../../../assets/card-img/facets.png";
import img4 from "../../../assets/card-img/sunbust.png";
import img5 from "../../../assets/card-img/Barplot.png";
import img6 from "../../../assets/card-img/popularity.png";

const slides = [
  {
    image: img1,
    title: "Bar Plot",
    description: "Margin ,Sales and Effcost",
  },
  {
    image: img2,
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
      <ReactCardSlider slides={slides}   />
    </div>
  );
};

export default Baz;



// import React from "react";

// export default function CardComponent() {
//     const posts = [
//         {
//             title: "React Tailwind Card with Grid 1",
//             img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
//             content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
//         },
//         {
//             title: "React Tailwind Card with Grid 2",
//             img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
//             content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
//         },
//         {
//             title: "React Tailwind Card with Grid 3",
//             img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
//             content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
//         },
//         {
//             title: "React Tailwind Card with Grid 4",
//             img: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
//             content: "react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content"
//         },
//     ];
//     return (
//         <>
//             <div className="grid gap-2 lg:grid-cols-4">
//                 {posts.map((items, key) => (
//                     <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
//                         <img
//                             className="object-cover w-full h-48"
//                             src={items.img}
//                             alt="image"
//                         />
//                         <div className="p-4">
//                             <h4 className="text-xl font-semibold text-blue-600">
                                
//                                 {items.title}
//                             </h4>
//                             <p className="mb-2 leading-normal">
//                             {items.content}
//                             </p>
//                             <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
//                                 Read more
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }
