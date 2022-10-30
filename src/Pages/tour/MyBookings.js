import React from "react";
import Header from "../Common/Header";
import ahsanManjil from "../../travel-guru/images/places/ahsanManjil.jpg";

const MyBookings = () => {
  return (
    <section>
      <Header black="black" />

      <div className="w-11/12 mx-auto">
        <h className="my-4 block text-2xl font-bold">My Bookings</h>
        <div class="flex flex-col bg-white rounded-lg border shadow-md md:flex-row w-full">
          <img
            class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-3/6 md:rounded-none md:rounded-l-lg"
            src={ahsanManjil}
            alt=""
          />
          <div class="flex flex-col p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
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
      </div>

      <div class="overflow-x-auto w-11/12 mx-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Place name
              </th>
              <th scope="col" class="py-3 px-6">
                Destination
              </th>
              <th scope="col" class="py-3 px-6">
                Date
              </th>
              <th scope="col" class="py-3 px-6">
                Hotel
              </th>
              <th scope="col" class="py-3 sr-only px-6">
                Update
              </th>
              <th scope="col" class="py-3 px-6">
                Total Cost
              </th>
              <th scope="col" class="py-3 sr-only px-6">
                Pay
              </th>
              <th scope="col" class="py-3 sr-only px-6">
                Cancel
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="py-4 px-6">Sliver</td>
              <td class="py-4 px-6">Laptop</td>
              <td class="py-4 px-6">$2999</td>
              <td class="py-4 px-6">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Update
                </a>
              </td>
              <td class="py-4 px-6">$2999</td>
              <td class="py-4 px-6"></td>
              <td class="py-4 px-6"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyBookings;
