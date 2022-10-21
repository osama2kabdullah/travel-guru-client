import React from "react";
import { Link } from "react-router-dom";

const PlaceCard = ({setPlace, place}) => {
  const {name, picture}= place;
  const cardBg = {
    backgroundImage: `url(${picture})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <div className="px-0">
      <div
      style={cardBg}
        className="relative mx-2 rounded-xl lg:h-72 h-64 p-3"
        onDoubleClick={() => setPlace(place)}
      >
        <h1 className="text-white absolute bottom-3 text-lg font-bold">{name}</h1>
      </div>
    </div>
  );
};

export default PlaceCard;
