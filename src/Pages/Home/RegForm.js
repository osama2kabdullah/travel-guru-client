import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Common/Button";

const RegForm = ({ setBooking, booking }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectedFromDate = watch("FromDate");

  const onSubmit = (data) => console.log(data);

  const todayDate = new Date().toLocaleDateString().split("/");
  const fromMin = todayDate[2] + "-" + todayDate[0] + "-" + todayDate[1];
  const afterDate = new Date(Date.now() + 30 * 86400000)
    .toLocaleDateString()
    .split("/");
  const fromMax = afterDate[2] + "-" + afterDate[0] + "-" + afterDate[1];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 mx-auto md:w-4/6 lg:mr-16 gap-5 m-2 grid rounded bg-white"
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
  );
};

export default RegForm;
