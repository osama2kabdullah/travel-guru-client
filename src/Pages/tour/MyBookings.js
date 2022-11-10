import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import ahsanManjil from "../../travel-guru/images/places/ahsanManjil.jpg";
import { useQuery } from "react-query";
import DivSpinner from "../Common/DivSpinner";
import BookingCard from "./BookingCard";
import PageRequire from "../Common/PageRequire";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useQuery("loadbookings", () =>
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
  if (data?.success === false) {
    return <PageRequire data={data} />;
  }
  
  return (
    <section>
      <Header black="black" />
      <div className="w-11/12 mx-auto">
        <h1 className="my-4 block text-2xl font-bold">My Bookings</h1>
        {data ? (
          data?.map((data) => (
            <BookingCard key={data._id} refetch={refetch} data={data} />
          ))
        ) : (
          <DivSpinner />
        )}
        {
          data?.length <= 0 && <p className="w-fit mx-auto">You have no bookings <span className="text-orange-500 cursor-pointer underline" onClick={()=>navigate('/')}>Book one</span></p>
        }
      </div>
    </section>
  );
};

export default MyBookings;
