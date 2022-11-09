import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import ahsanManjil from "../../travel-guru/images/places/ahsanManjil.jpg";
import { useQuery } from "react-query";
import DivSpinner from "../Common/DivSpinner";
import BookingCard from "./BookingCard";
import PageRequire from "../Common/PageRequire";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";

const MyBookings = () => {
  const { data, isLoading, error } = useQuery("loadbookings", () =>
    fetch("http://localhost:5000/userbookings", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <DivSpinner />;
  }
  if (data.success === false) {
    return <PageRequire data={data} />;
  }
  
  console.log(data, 'inside my bookings');

  return (
    <section>
      <Header black="black" />
      <div className="w-11/12 mx-auto">
        <h1 className="my-4 block text-2xl font-bold">My Bookings</h1>
        {data ? (
          data?.map((data) => (
            <BookingCard key={data._id} data={data} />
          ))
        ) : (
          <DivSpinner />
        )}
      </div>
    </section>
  );
};

export default MyBookings;
