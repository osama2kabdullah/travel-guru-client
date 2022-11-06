import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelsMap from "./HotelsMap";
import PLaceMap from "./PLaceMap";

const BookingCard = ({ data }) => {
  const { toPlace, FromDate, toDate, fromPlace } = data;
  const [place, setPlace] = useState("");
  const [cost, setCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const { picture, about, latitude, longitude, name } = place;
  const navigate = useNavigate();

  //sum of total
  useEffect(() => {
    if (cost && data?.hotel) {
      console.log(cost, data?.hotel, "inside");
      const numCost = parseFloat(cost.cost.split("$")[1]);
      const days = parseInt(data?.hotel.days);
      setTotalCost(days * numCost);
    }
  }, [cost, data?.hotel]);

  //get hotel cost
  useEffect(() => {
    if (data?.hotel?.hotelName && name) {
      fetch(
        "http://localhost:5000/hotel/" + data.hotel.hotelName + "/" + name,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "authorization_token"
            )}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCost(data);
        });
    }
  }, [data?.hotel?.hotelName, name]);

  //get place info
  useEffect(() => {
    fetch("http://localhost:5000/getplace", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlace(data);
      });
  }, [data]);

  const dateCurrection = (date) => {
    const splitDate = date?.split("-");
    const dateStart =
      splitDate?.[1] + "/" + splitDate?.[2] + "/" + splitDate?.[0];
    const date_time = new Date(dateStart);
    return date_time;
  };
  const date_1 = dateCurrection(FromDate);
  const date_2 = dateCurrection(toDate);
  const difference = date_2.getTime() - date_1.getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

  const fullDay = (date) => {
    return date.toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const fullDate_1 = fullDay(date_1);
  const fullDate_2 = fullDay(date_2);

  return (
    <div className="flex my-12 flex-col bg-white rounded-lg border shadow-md md:flex-row w-full">
      <img
        className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-3/6 md:rounded-none md:rounded-l-lg"
        src={picture}
        alt=""
      />
      <div className="flex flex-col p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {TotalDays} {TotalDays > 1 ? "days" : "day"} tript in {toPlace} from{" "}
          {fromPlace}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">About {toPlace}:</span> {about}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Date:</span> {fullDate_1} to{" "}
          {fullDate_2} ({TotalDays} {TotalDays > 1 ? "days" : "day"})
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Hotel:</span>{" "}
          {data?.hotel ? (
            <>
              {data?.hotel.hotelName}. {data?.hotel.rooms} room,{" "}
              {data?.hotel.rooms} adults and {data?.hotel.rooms} children
            </>
          ) : (
            <span>
              You have not book any hotel.{" "}
              <span
                onClick={() => navigate("/bookhotel/" + name)}
                className="text-orange-500 underline cursor-pointer"
              >
                Book one.
              </span>
            </span>
          )}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Cost:</span> ${totalCost} (only
          hotel biils)
        </p>
        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Map:</span>
          <br />

          <div className="h-64">
            {place && <PLaceMap name={name} lat={latitude} long={longitude} />}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium text-xs rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Cancel this trip
          </button>
          <button
          onClick={()=>navigate('/pay/'+toPlace)}
            type="button"
            className=" shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br"
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
