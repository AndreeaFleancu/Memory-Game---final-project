import "./OneCard.css";
import React from "react";


  

export default function OneCard({ card, makeChoice, flipped }) {
  const makeClick = () => {
      makeChoice(card);
  };

  return (
      <div className="card" key={card.id}>
          <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src} alt="card-face" />
              <img
                  className="back"
                  src="/images/cover.jpg"
                  onClick={makeClick}
                  alt="card-back"
              />
          </div>
      </div>
  );
}