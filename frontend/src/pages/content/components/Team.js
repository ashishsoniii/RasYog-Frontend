import React from "react";
import "../Content.css";
import UserCards1 from "./UserCards1";
import UserCards2 from "./UserCards2";
import { GrLinkedinOption } from "react-icons/gr";
import { GrGithub } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";
import pranav from "../../../assets/developer/pranav.png";
import shreyansh from "../../../assets/developer/shreyansh.jpeg";
import sameer from "../../../assets/developer/sameer.jpeg";
import ashish from "../../../assets/developer/ashish.jpg";
import tanya from "../../../assets/developer/tanya.jpeg";
import anjali from "../../../assets/developer/anjali.jpeg";

function Team() {
  const cardsData = [
    {
      content: "Ashish Soni",
      post: "Frontend Developer",
      imageSrc: ashish,
      link1: {
        url: "https://www.linkedin.com/in/ashishsoniii/",
        icon: <GrLinkedinOption />,
      },
      link2: {
        url: "https://github.com/ashishsoniii/",
        icon: <GrGithub />,
      },
    },
    {
      content: "Pranav Malpani",
      post: "Backend Developer",
      imageSrc: pranav,
      link1: {
        url: "https://www.linkedin.com/in/pranav-malpani-868389239/",
        icon: <GrLinkedinOption />,
      },
      link2: {
        url: "https://github.com/malpani2003",
        icon: <GrGithub />,
      },
      link3: {
        url: "https://malpani2003.github.io/pranav_portfolio/",
        icon: <CgWebsite />,
      },
    },
    {
      content: "Shreyansh Goyal",
      post: "Backend Developer",
      imageSrc: shreyansh,
      link1: {
        url: "https://www.linkedin.com/in/shreyansh-goyal-9b79b8229/",
        icon: <GrLinkedinOption />,
      },
      link2: {
        url: "https://github.com/shreyanshgoyal2004/",
        icon: <GrGithub />,
      },
    },
  ];
  const cardsData2 = [
    {
      content: "Tanya Garg",
      post: "Data Science Engineer",
      imageSrc: tanya,
      link1: {
        url: "https://www.linkedin.com/in/tanya-garg14/",
        icon: <GrLinkedinOption />,
      },
      link2: {
        url: "https://github.com/tngarg5",
        icon: <GrGithub />,
      },
    },
    {
      content: "Anjali Yadav",
      post: "Data Science Engineer",
      imageSrc: anjali,
      link1: {
        url: "https://www.linkedin.com/in/anjali-yadav23/",
        icon: <GrLinkedinOption />,
      },
      link2: {
        url: "https://github.com/Anjali2303/",
        icon: <GrGithub />,
      },
    },
    // {
    //   content: "Sameer Saifi",
    //   post: "Sameer Saifi",
    //   imageSrc: sameer,
    //   link1: {
    //     url: "https://www.linkedin.com/in/sameer-saifi-88297420b/",
    //     icon: <GrLinkedinOption />,
    //   },
    //   link2: {
    //     url: "https://github.com/Sameersaifi1512/",
    //     icon: <GrGithub />,
    //   },
    // },
  ];

  return (
    <div className="full-team">
      <div className="on-home-bg ">
        <div className="main-home-text"> About Us! </div>
        <div className="main-home-sub-text main-home-sub-text_about-US">
          This is a comprehensive taxonomic and sales analysis of a departmental
          store. Our team has analyzed and organized the store's data into
          various categories based on similarities and differences, including
          product categories, brand categories, and price categories. We have
          also analyzed sales data to provide insights into product popularity
          and availability. .{" "}
        </div>
      </div>
      <div className="white-bg">
        <div className="main-home-text"> Meet The Team! </div>
        <div className="cards-on-team">
          <UserCards1 cardsData={cardsData2} />
          <UserCards1 cardsData={cardsData} />
        </div>
      </div>
      {/* <UserCards2 cardsData={cardsData} /> */}
    </div>
  );
}

export default Team;
