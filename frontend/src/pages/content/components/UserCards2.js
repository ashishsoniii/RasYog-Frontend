import React from "react";

function Cards({ cardsData }) {
  return (
    <section className="Cards cards-middle">
        {cardsData.map((card, index) => (
      <div className="bg-white p-10 rounded-lg shadow-xl">
          <div key={index} className="card flex flex-col items-center p-5 w-full max-w-md">
            <div className="image-container w-32 h-32 mb-5 overflow-hidden rounded-full border border-gray-100 shadow-sm">
              <img
                className="w-full h-full object-cover"
                src={card.imageSrc}
                alt={card.content}
              />
            </div>
            <img src="" alt="" />
            <h1 className="text-xl font-bold">{card.content}</h1>
            <h2 className="tracking-wide">
              {card.post}
            </h2>
            <ul className="cards__list flex">
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
      </div>
        ))}
    </section>
  );
}

export default Cards;
