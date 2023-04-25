// import React from "react";
// import "../Content.css";
// import "./Team.scss";
// import { GrLinkedinOption } from "react-icons/gr";

// function Cards() {
//   return (
//     <section
//       className="Cards
// "
//     >
//       <div
//         className="main-text-Cards
//     "
//       >
//         Meet Our Cards !
//       </div>

//       <div className="card__collection clear-fix">
//         <div className="cards cards--two">
//           <img
//             src="https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d702cb99ca804bffcfa8820c46483264&auto=format&fit=crop&w=651&q=80"
//             className="img-responsive"
//             alt="Cards"
//           />
//           <span className="cards--two__rect"></span>
//           <span className="cards--two__tri"></span>
//           <p>Lucy Grace</p>
//           <ul className="cards__list">
//             <li>
//               <i className="fab fa-facebook-f"></i>
//             </li>
//             <li>
//               <i className="fab fa-twitter"></i>
//             </li>
//             <li>
//               <i className="fab fa-instagram"></i>
//             </li>
//             <li>
//               <i className="fab fa-linkedin-in">
//                 <a href="" target="__blank">
//                   <GrLinkedinOption />
//                 </a>
//               </i>
//             </li>
//           </ul>
//         </div>
//         </div>

//     </section>
//   );
// }

// export default Cards;

import React from "react";
import "../Content.css";
import "./Team.scss";

function Cards({ cardsData }) {
  return (
    <section className="Cards cards-middle">
      <div className="card__collection clear-fix">
        {cardsData.map((card, index) => (
          <div key={index} className="cards cards--two">
            <img
              src={card.imageSrc}
              className="img-responsive"
              alt={card.content}
            />
            <span className="cards--two__rect"></span>
            <span className="cards--two__tri">
              <p className="meh_upr-wala-text_hu">{card.post}</p>
            </span>
            <p>{card.content}</p>
            <ul className="cards__list">
              {card.link1.icon && (
                <li>
                  <i className="fab fa-linkedin-in">
                    <a href={card.link1.url} target="__blank">
                      {card.link1.icon}
                    </a>
                  </i>
                </li>
              )}
              {card.link2 && (
                <li>
                  <i className="fab fa-linkedin-in">
                    <a href={card.link2.url} target="__blank">
                      {card.link2.icon}
                    </a>
                  </i>
                </li>
              )}
              {card.link3 && (
                <li>
                  <i className="fab fa-linkedin-in">
                    <a href={card.link3.url} target="__blank">
                      {card.link3.icon}
                    </a>
                  </i>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cards;
