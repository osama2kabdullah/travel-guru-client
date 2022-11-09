import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import useValidateUser from "../../hooks/useValidateUser";
import DivSpinner from "../Common/DivSpinner";
import Header from "../Common/Header";
import PageRequire from "../Common/PageRequire";
import HotelsMap from "./HotelsMap";
import "../../App.css";
import PLaceMap from "./PLaceMap";
import Rectangle1 from "../../travel-guru/images/Rectangle1.png";
import HotelCard from "./HotelCard";

const BookHotel = () => {
  const { name } = useParams();
  const [error, setError] = useState(null);

  //verify user and get hotels data
  useEffect(() => {
      fetch("http://localhost:5000/hotels/" + name, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setError(data);
        });
        
  }, [name]);

  if (!error) {
    return;
  }
  
  return (
    <section>
      <Header black="black" />
      <div className="w-11/12 mb-12 mx-auto lg:flex-row flex flex-col-reverse gap-12 pt-12 border-t-2">
        <div>
          <h1 className="text-2xl font-bold">Stay in {name}</h1>
          <div className="grid gap-5 mt-8">
            {error.hotels?.map((hotel) => (
              <HotelCard hotel={hotel} placeName={name} />
            ))}
          </div>
        </div>

        <div className="w-full sticky top-0 rounded-xl overflow-hidden h-[40vh] lg:h-[90vh]">
          <HotelsMap hotel={error?.hotels}/>
        </div>
      </div>
    </section>
  );
};

export default BookHotel;
