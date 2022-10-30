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
    fetch("https://guarded-ravine-02179.herokuapp.com/userbookings", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
      },
    }).then((res) => res.json())
  );
  
  if (isLoading) {
    return <DivSpinner />;
  }
  return (
    <section>
      <Header black="black" />
      <div className="w-11/12 mx-auto">
        <h1 className="my-4 block text-2xl font-bold">My Bookings</h1>
        {data ? (
          data?.map((data) => <BookingCard data={data} />)
        ) : (
          <DivSpinner />
        )}
      </div>
    </section>
  );
};

export default MyBookings;
