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
  const [filter, setFilter] = useState('future_trips');
    
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useQuery("loadbookings", () =>
    fetch("https://guarded-ravine-02179.herokuapp.com/filterbooking/"+filter, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
      },
    }).then((res) => res.json())
  );

  useEffect(()=>{
    refetch();
  },[filter, refetch])
  
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
        <div className="flex justify-between items-center">  
        <h1 className="my-4 block text-2xl font-bold">My Bookings</h1>
        <select onChange={e=>setFilter(e.target.value)} className="border" name="filter_bookings" id="">
          <option value="future_trips">Future trips</option>
          <option value="running_trips">Running trips</option>
          <option value="previus_trips">Previus trips</option>
        </select>
        </div>
        {data ? (
          data?.map((data) => (
            <BookingCard key={data._id} refetch={refetch} data={data} />
          ))
        ) : (
          <DivSpinner />
        )}
        {
          data?.length <= 0 && <p className="w-fit mx-auto">You have no bookings</p>
        }
      </div>
    </section>
  );
};

export default MyBookings;
