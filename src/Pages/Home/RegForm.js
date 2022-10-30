import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import auth from "../../firebase.init";
import Button from "../Common/Button";
import DivSpinner from "../Common/DivSpinner";

const RegForm = ({ setBooking, booking }) => {
  const navigate = useNavigate();
  const [bookLoading, setBookLoadiung] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectedFromDate = watch("FromDate");
  //context access
  const currentUser = useContext(AppContext);
  console.log(currentUser, "kaka");

  const onSubmit = (data) => {
    setBookLoadiung(true);
    fetch("http://localhost:5000/makebooking", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setBookLoadiung(false);
        if (data.result?.acknowledged) {
          navigate("/mybookings");
        }
      });
  };

  const todayDate = new Date().toLocaleDateString().split("/");
  const fromMin = todayDate[2] + "-" + todayDate[0] + "-" + todayDate[1];
  const afterDate = new Date(Date.now() + 30 * 86400000)
    .toLocaleDateString()
    .split("/");
  const fromMax = afterDate[2] + "-" + afterDate[0] + "-" + afterDate[1];

  return (
    <>
      {currentUser ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 relative mx-auto md:w-4/6 w-full lg:mr-16 gap-5 m-2 grid rounded bg-white"
        >
          {bookLoading && <DivSpinner />}
          <div>
            <label>Origin</label>
            <br />
            <input
              required
              {...register("fromPlace")}
              className="bg-gray-100 mt-1 w-full p-2 text-md"
              type="text"
            />
          </div>
          <div>
            <label>Destination</label>
            <br />

            <input
              className="bg-gray-100 mt-1 w-full p-2 text-md"
              {...register("toPlace")}
              readOnly
              style={{ outline: "none" }}
              value={booking.name}
            />
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <label>Start</label>
              <br />
              <input
                min={fromMin}
                max={fromMax}
                {...register("FromDate")}
                required
                className="bg-gray-100 w-full mt-1 p-2 text-md"
                type="date"
              />
            </div>
            <div className="w-full">
              <label>End</label>
              <br />
              <input
                readOnly={!selectedFromDate}
                min={selectedFromDate}
                className="bg-gray-100 w-full mt-1 p-2 text-md"
                type="date"
                required
                {...register("toDate")}
              />
            </div>
          </div>
          <Button>Start Booking</Button>
          <div className="text-center">
            or{" "}
            <button
              onClick={() => setBooking(false)}
              className="underline text-sky-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 mx-auto md:w-4/6 w-full lg:mr-16 gap-5 m-2 grid rounded bg-white">
          <h1>
            You must{" "}
            <Link to="/login" className="underline font-bold text-orange-500">
              Login
            </Link>{" "}
            first
          </h1>
        </div>
      )}
    </>
  );
};

export default RegForm;
