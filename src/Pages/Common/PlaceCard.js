import React from "react";
import { Link } from "react-router-dom";
import Sajek from '../../travel-guru/images/Sajek.png';

const PlaceCard = () => {
  return (
    <Link>
        <div class="relative overflow-hidden cursor-pointer">
          <img
            class="object-cover"
            src={Sajek}
            alt="Flower and sky"
          />

          <div class="absolute bottom-0 left-0 px-2 py-4">
            <h4 class="mb-3 text-2xl font-bold tracking-tight text-white">
              Sajek
            </h4>
          </div>
        </div>
    </Link>
  );
};

export default PlaceCard;
