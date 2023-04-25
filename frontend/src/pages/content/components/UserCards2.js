import React from "react";
import "../Content.css";
import "./Team.scss";

function Cards({ cardsData }) {
  return (
    <section className="Cards cards-middle">
      <div className="card__collection clear-fix">
        {cardsData.map((card, index) => (
          <div key={index} className="cards cards--three">
            <img
              src={card.imageSrc}
              className="img-responsive"
              alt={card.content}
            />
            <span className="cards--three__rect-1">
              <span className="shadow-1">o</span>
              <p>{card.content}</p>
            </span>
            <span className="cards--three__rect-2">
              <span className="shadow-2">j</span>
            </span>
            <span className="cards--three__circle">j</span>
            <ul className="cards--three__list">
              <li>
                <i className="fab fa-facebook-f"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <i className="fab fa-linkedin-in"></i>
              </li>
            </ul>
            <ul className="cards__list">
              {card.link.icon && (
                <li>
                  <i className="fab fa-linkedin-in">
                    <a href={card.link.url} target="__blank">
                      {card.link.icon}
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
