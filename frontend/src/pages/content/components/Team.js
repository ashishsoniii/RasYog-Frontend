// Team Page to show detail of Developers
// Team -> UserCards (card)

import React from "react";
import "../Content.css";
import UserCards2 from "./UserCards2";
import { GrLinkedinOption } from "react-icons/gr";
import { GrGithub } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";
import pranav from "../../../assets/developer/pranav1.png";
import shreyansh from "../../../assets/developer/shreyansh.jpeg";
// import sameer from "../../../assets/developer/sameer.jpeg";
import ashish from "../../../assets/developer/ashish.jpg";
import tanya from "../../../assets/developer/tanya.jpeg";
import anjali from "../../../assets/developer/anjali.jpeg";

function Team() {

    // data goes into UserCards as props!

  const cardsData1 = [
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
      link3: {
        url: "https://ashishsoni.studio/",
        icon: <CgWebsite />,
      },
    },
  ];
  const cardsData3 = [
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
  ];
  const cardsData4 = [
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
  ];
  const cardsData5 = [
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
  ];
  // {
  //   content: "Anjali Yadav",
  //   post: "Data Science Engineer",
  //   imageSrc: anjali,
  //   link1: {
  //     url: "https://www.linkedin.com/in/anjali-yadav23/",
  //     icon: <GrLinkedinOption />,
  //   },
  //   link2: {
  //     url: "https://github.com/Anjali2303/",
  //     icon: <GrGithub />,
  //   },
  // },
  // // {
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

  return (
    <div className="full-team">
      <div className="on-home-bg ">

      {/* heading - About Us! */}
        <div className="main-home-text"> About Us! </div>
        <div className="main-home-sub-text main-home-sub-text_about-US">
          Discerning Chemistry of Taste (RasYog) by AI driven understanding of
          the relationships between Consumer, Brand & Products. Our mission is
          to develop a research fostered mutually beneficial relationship
          between researchers and industry. This research with data bartering,
          we envision, will be done with a strong Indian context not just from a
          data perspective but also leveraging Indian Aesthetic and Cognitive
          theories within the AI modeling. Thus accomplishing a larger vision of
          rejuvenating the cultural awareness as well as scientific interest in
          Indian philosophies for aesthetics and human behavior.
        </div>
      </div>
      <div className="white-bg">
        <div className="main-home-text"> Meet The Team! </div>
        <div className="cards-on-team">
          <UserCards2 cardsData={cardsData2} />
          <UserCards2 cardsData={cardsData5} />
          <UserCards2 cardsData={cardsData1} />
        </div>
        <div className="cards-on-team">
          <UserCards2 cardsData={cardsData3} />
          <UserCards2 cardsData={cardsData4} />
        </div>
        {/* <UserCards1 cardsData={cardsData} />
          <UserCards1 cardsData={cardsData} /> */}
      </div>
      {/* <UserCards2 cardsData={cardsData} /> */}
    </div>
  );
}

export default Team;
