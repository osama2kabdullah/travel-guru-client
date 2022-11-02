import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Common/Header";
import Rectangle26 from "../../travel-guru/images/Rectangle26.png";
import Rectangle27 from "../../travel-guru/images/Rectangle27.png";
import Rectangle28 from "../../travel-guru/images/Rectangle28.png";
import Button from "../Common/Button";
import { useForm } from "react-hook-form";

const HotelDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const { hotelname } = useParams();
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
          <div className=" md:w-3/6 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 relative mx-auto md:w-4/6 w-full lg:mr-16 gap-5 m-2 grid rounded bg-white"
          >
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
                //   value={booking.name}
              />
            </div>

            <div className="flex gap-2">
              <div className="w-full">
                <label>Start</label>
                <br />
                <input
                  // min={fromMin}
                  // max={fromMax}
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
                  // readOnly={!selectedFromDate}
                  // min={selectedFromDate}
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
                //   onClick={() => setBooking(false)}
                className="underline text-sky-300"
              >
                Cancel
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDetails;
