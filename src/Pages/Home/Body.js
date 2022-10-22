import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../Common/Button";
import sundorbon from "../../travel-guru/images/sundorbon.png";
import { useState } from "react";
import PlaceCard from "../Common/PlaceCard";
import { useEffect } from "react";

const Body = ({ setPlace, place }) => {
  const [booking, setBooking] = useState(false);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    fetch("places.json")
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
          <Button setBooking={() => setBooking(place)}>Book a tour</Button>
        </div>
      </div>
      {/* slider section/form section */}
      {booking ? (
        <form className="p-6 mx-auto md:w-4/6 lg:mr-16 gap-5 m-2 grid rounded bg-white">
          <div>
            <label>Origin</label>
            <br />
            <input
              className="bg-gray-100 mt-1 w-full p-2 text-md"
              type="text"
            />
          </div>
          <div>
            <label>Destination</label>
            <br />
            <input
              className="bg-gray-100 mt-1 w-full p-2 text-md"
              type="text"
              disabled
              value={booking.name}
            />
          </div>
          <div className="flex w-full gap-2">
            <div>
              <label>Start</label>
              <br />
              <input
                className="bg-gray-100 mt-1 w-full p-2 text-md"
                type="text"
              />
            </div>
            <div>
              <label>End</label>
              <br />
              <input
                className="bg-gray-100 mt-1 w-full p-2 text-md"
                type="text"
              />
            </div>
          </div>
          <Button>Start Booking</Button>
          <div className="text-center">
            or <button onClick={()=>setBooking(false)} className="underline text-sky-300">Cancel</button>
          </div>
        </form>
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
