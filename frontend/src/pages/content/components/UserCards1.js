
import React from "react";
import "../Content.css";

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
