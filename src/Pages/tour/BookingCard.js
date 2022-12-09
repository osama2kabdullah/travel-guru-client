import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import HotelsMap from "./HotelsMap";
import PLaceMap from "./PLaceMap";

const BookingCard = ({ data, refetch }) => {
  const { toPlace, FromDate, toDate, fromPlace, _id, hotel, payStatus } = data;
  const [place, setPlace] = useState("");
  const { picture, about, latitude, longitude, name } = place;
  const navigate = useNavigate();
  const currentUser = useContext(AppContext);
  
  //get place detail
  useEffect(() => {
    if (toPlace) {
      fetch("https://travel-guru-server-mocha-nine.vercel.app/getplace/" + toPlace, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlace(data);
        });
    }
  }, [toPlace]);

  //cancelTour
  const cancelTour = (id, email) => {
    const procceed = window.confirm("You want to Delete?");
    if (procceed) {
      fetch("https://travel-guru-server-mocha-nine.vercel.app/cancelTour/" + id, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )} ${email}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          refetch();
        });
    }
  };
  
  const difference = new Date(toDate).getTime() - new Date(FromDate).getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  
  const fullDay = (date) => {
    return date.toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const fullDate_1 = fullDay(new Date(FromDate));
  const fullDate_2 = fullDay(new Date(toDate));

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
          <span className="underline font-bold">About {toPlace}:</span>
          {about}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Date:</span> {fullDate_1} to{" "}
          {fullDate_2} ({TotalDays} {TotalDays > 1 ? "days" : "day"})
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Hotel:</span>{" "}
          {hotel ? (
            <>
              {hotel?.hotelName}. {hotel?.rooms} room, {hotel?.adults} adults
              and {hotel?.children} children
            </>
          ) : (
            <span>
              You have not book any hotel.{" "}
              <span
                onClick={() => navigate("/" + name + "/bookhotel/" + _id)}
                className="text-orange-500 underline cursor-pointer"
              >
                Book one.
              </span>
            </span>
          )}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Cost:</span>${hotel?.totalCost}
          (only hotel biils)
        </p>
        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="underline font-bold">Map:</span>
          <br />

          <div className="h-64">
            {place && <PLaceMap name={name} lat={latitude} long={longitude} />}
          </div>
        </div>

        <div className="flex justify-between">
          
          {
            new Date(toDate) <= new Date() ? ''
            :<button
            onClick={() => cancelTour(_id, currentUser?.email)}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium text-xs rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Cancel this trip
          </button>
          }
          
          {
            new Date(toDate) <= new Date() || payStatus ? ''
            :<button
            onClick={() => navigate("/pay/" + _id)}
            type="button"
            className=" shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br"
          >
            Pay (${hotel?.totalCost})
          </button>
          }
          
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
