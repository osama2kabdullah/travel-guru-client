import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../Common/Button";
import sundorbon from "../../travel-guru/images/sundorbon.png";
import { useState } from "react";
import PlaceCard from "../Common/PlaceCard";
import { useEffect } from "react";
import RegForm from "./RegForm";

const Body = ({ setPlace, place }) => {
  const [booking, setBooking] = useState(false);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/comonplaces")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      });
  }, []);

  return (
    <div className="grid lg:mt-12 grid-cols-1 lg:grid-cols-2 gap-3">
      {/* fist section */}
      <div className="lg:pl-12 px-2 text-white">
        <h1 className="lg:text-5xl text-2xl font-bold">{place?.name}</h1>
        <p className="lg:text-xl py-4">{place.about}</p>
        <div className="w-fit">
          <Button btn={() => setBooking(place)}>Book a tour</Button>
        </div>
      </div>
      {/* slider section/form section */}
      {booking ? (
        // form
        <RegForm booking={booking} setBooking={setBooking}/>
      ) : (
        <div>
          <Slider
            prevArrow={<SamplePrevArrow />}
            nextArrow={<SampleNextArrow />}
            slidesToShow={3}
            swipeToSlide={true}
          >
            {places.map((place) => (
              <PlaceCard
                key={place._id}
                place={place}
                setPlace={setPlace}
              ></PlaceCard>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
};
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
};

export default Body;
