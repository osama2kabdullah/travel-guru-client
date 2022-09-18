import React from "react";
import Button from "../Common/Button";

const PlaceDeatilCard = () => {
  return (
    <div className="text-white">
      <h1 className="text-5xl mb-3 font-bold">Cox's Bazar</h1>
      <p className="mb-10">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        nihil laborum soluta consequuntur ad quaerat corrupti atque ipsum omnis
        inventore? Eaque, accusamus est. Harum, nobis nostrum aspernatur nam
        laudantium id?
      </p>
      <Button>
        Booking{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 inline h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
    </div>
  );
};

export default PlaceDeatilCard;
