import React from "react";
import Header from "../Common/Header";
import ahsanManjil from "../../travel-guru/images/places/ahsanManjil.jpg";
import { useQuery } from "react-query";
import { useEffect } from "react";
import DivSpinner from "../Common/DivSpinner";
import { useState } from "react";
import BookingCard from "./BookingCard";

const MyBookings = () => {
  const { data, isLoading } = useQuery("loadbookings", () =>
    fetch("http://localhost:5000/userbookings", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
      },
    }).then((res) => res.json())
  );

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (data) {
        const placesname = [];
        data.forEach((element) => {
          fetch("http://localhost:5000/getplace", {
            method: "POST",
            headers: {
              authorization: `Bearer ${localStorage.getItem(
                "authorization_token"
              )}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(element),
          })
            .then((res) => res.json())
            .then((data) => {
              placesname.push(data);
            });
        });
        console.log(placesname, 'lofi');
        setPlaces(placesname);
    }
  }, [data]);

  if (isLoading) {
    return <DivSpinner />;
  }
  return (
    <section>
      <Header black="black" />
      <div className="w-11/12 mx-auto">
        <h1 className="my-4 block text-2xl font-bold">My Bookings</h1>
        {places ? (
          places?.map((place) => <BookingCard place={place} />)
        ) : (
          <DivSpinner />
        )}
      </div>
    </section>
  );
};

export default MyBookings;
