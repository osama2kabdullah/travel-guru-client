import React from "react";

const BookingCard = ({ place }) => {
  const { picture, toPlace, FromDate, toDate, fromPlace } = place;
  console.log(place);
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

  console.log(TotalDays);

  return (
    <div class="flex flex-col bg-white rounded-lg border shadow-md md:flex-row w-full">
      <img
        class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-3/6 md:rounded-none md:rounded-l-lg"
        src={picture}
        alt=""
      />
      <div class="flex flex-col p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {TotalDays} day tript in {toPlace} from {fromPlace}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium text-xs rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Cancel
        </button>
        <button
          type="button"
          class=" shadow-lg shadow-cyan-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br"
        >
          Pay now
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
