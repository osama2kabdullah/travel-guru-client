import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Common/Header";
import Rectangle26 from "../../travel-guru/images/Rectangle26.png";
import Rectangle27 from "../../travel-guru/images/Rectangle27.png";
import Rectangle28 from "../../travel-guru/images/Rectangle28.png";
import Button from "../Common/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DivSpinner from "../Common/DivSpinner";
import { useContext } from "react";
import { AppContext } from "../../App";
import PageRequire from "../Common/PageRequire";
import { useEffect } from "react";

const HotelDetails = () => {
  const btn = "text-2xl text-center cursor-pointer font-bold rounded-full bg-gray-100 h-12 w-12";
  const currentUser = useContext(AppContext);
  const { hotelname, name, bookingId } = useParams();
  const [bookLoading, setBookLoadiung] = useState(false);
  const [children, setChildren] = useState(0);
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(2);
  const [days, setDays] = useState(1);
  const [error, setError] = useState(false);
  const [validError, setValidError] = useState(false);
  const navigate = useNavigate();

  //validate user
  useEffect(()=>{
      fetch('http://localhost:5000/usersforbookhotel/'+name, {
        method:'GET',
        headers: {
          authorization:`Bearer ${localStorage.getItem('authorization_token')} ${currentUser?.email}`
        }
      }).then(res=>res.json()).then(data=>{
        setValidError(data);
      })
  },[currentUser, name])
  
  //submit form
  const submitForm = (e) => {
    e.preventDefault();
    setBookLoadiung(true);
    const data = {days :e.target.days.value, rooms :e.target.rooms.value, adults: e.target.adults.value, children: e.target.children.value }
    fetch("http://localhost:5000/bookhotel/" + bookingId + "/"+ hotelname + "/"+ name, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authorization_token") + " " + currentUser.email,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setBookLoadiung(false);
        if(data?.acknowledged){
          navigate('/mybookings')
        }else {
          setError(data);
        }
      });
  };
  
  if(validError.valid === false || validError?.success === false || error){
    return <PageRequire data={validError || error}/>
  }
  
  return (
    <section>
      <Header black="black" />
      <div className="w-11/12 mb-12 mx-auto pt-12 border-t-2">
        <h1 className="text-2xl font-bold">Your sleep in {hotelname}</h1>
        <div className="flex flex-col mt-5 md:flex-row">
          <div className="grid gap-3 md:w-3/6 w-full grid-cols-2">
            <img className="col-span-2 w-full" src={Rectangle26} alt="" />
            <img className="w-full" src={Rectangle27} alt="" />
            <img className="w-full" src={Rectangle28} alt="" />
          </div>
          <div className=" md:w-3/6 md:mt-0 mt-12 ml-0 md:ml-12 w-full">
            <div className="grid gap-5">
              <h1 className="text-xl font-bold">About {hotelname}</h1>
              <Badge />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                quisquam eos assumenda eligendi tempora? Temporibus assumenda
                illo exercitationem dolorum aliquid culpa nam accusamus
                cupiditate fugiat pariatur, velit neque tempora corrupti!
              </p>
            </div>
            <form
              onSubmit={submitForm}
              className="relative mx-auto w-4/6 gap-5 grid rounded bg-white"
            >
              {bookLoading && <DivSpinner />}
              <div className="flex items-center justify-between">
                Adults{" "}
                <div className="flex items-center gap-6">
                  <span
                    onClick={() => adults > 1 && setAdults(adults - 1)}
                    className={btn}
                  >
                    -
                  </span>
                  <input
                    type="text"
                    name="adults"
                    value={adults}
                    readOnly
                    className="w-3 focus:outline-none bg-transparant"
                  />
                  <span
                    onClick={() => adults < 9 && setAdults(adults + 1)}
                    className={btn}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                Children{" "}
                <div className="flex items-center gap-6">
                  <span
                    onClick={() => children > 0 && setChildren(children - 1)}
                    className={btn}
                  >
                    -
                  </span>
                  <input
                    type="text"
                    name="children"
                    value={children}
                    
                    readOnly
                    className="w-3 focus:outline-none bg-transparant"
                  />
                  <span
                    onClick={() => children < 5 && setChildren(children + 1)}
                    className={btn}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                Rooms{" "}
                <div className="flex items-center gap-6">
                  <span
                    onClick={() => rooms > 1 && setRooms(rooms - 1)}
                    className={btn}
                  >
                    -
                  </span>
                  <input
                    type="text"
                    name="rooms"
                    readOnly
                    value={rooms}
                    className="w-3 focus:outline-none bg-transparant"
                  />
                  <span
                    onClick={() => rooms < 5 && setRooms(rooms + 1)}
                    className={btn}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                Days{" "}
                <div className="flex items-center gap-6">
                  <span
                    onClick={() => days > 1 && setDays(days - 1)}
                    className={btn}
                  >
                    -
                  </span>
                  <input
                    type="text"
                    name="days"
                    readOnly
                    value={days}
                    className="w-3 focus:outline-none bg-transparant"
                  />
                  <span
                    onClick={() =>setDays(days + 1)}
                    className={btn}
                  >
                    +
                  </span>
                </div>
              </div>
              {currentUser && <Button>Start Booking</Button>}

              <p
                onClick={() => navigate(-1)}
                className="underline text-center cursor-pointer text-sky-300"
              >
                Cancel
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Badge = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
        Default
      </span>
      <span class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
        Dark
      </span>
      <span class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
        Red
      </span>
      <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
        Green
      </span>
      <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
        Yellow
      </span>
      <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">
        Indigo
      </span>
      <span class="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
        Purple
      </span>
      <span class="bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">
        Pink
      </span>
    </div>
  );
};

export default HotelDetails;
