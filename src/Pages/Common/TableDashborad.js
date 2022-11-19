import React from "react";
import TData from "../dashboard/TData";
import TotalDays from "./TotalDays";

const TableDashborad = ({ users, setShowModal, thead, bookings, location, form }) => {

  return (
    <>
      <thead class="bg-white border-b">
        <tr>
          {thead.map((thed, index) => (
            <th
              scope="col"
              class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              {thed}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bookings?.map((booking, index) => (
          <tr class="bg-gray-100 border-b">
            <td class="px-6 py-4 whitespace-nowrap font-medium ">
              {index + 1}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">{booking?.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">{booking?.toPlace}</td>

            <td class="px-6 py-4 whitespace-nowrap">{booking?.fromPlace}</td>

            <td class="px-6 py-4 whitespace-nowrap">
              {new Date(booking?.toDate).toLocaleDateString()}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <TotalDays
                toDate={booking?.toDate}
                FromDate={booking?.FromDate}
              />
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              {booking?.hotel?.hotelName}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              {booking?.hotel?.totalCost && "$" + booking?.hotel?.totalCost}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              {booking?.payStatus ? (
                <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  Paid
                </span>
              ) : (
                <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                  Pending
                </span>
              )}
            </td>
          </tr>
        ))}

        {users?.map((user, index) => (
          <tr class="bg-gray-100 border-b">
            <td class="px-6 py-4 whitespace-nowrap font-medium ">
              {index + 1}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{user?.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">{user?.displayName}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <TData email={user?.email} />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {user?.role === "admin" && (
                <span class="bg-green-100 text-green-800 font-bold mr-2 px-2.5 py-0.5 rounded">
                  {user?.role}
                </span>
              )}
              {user?.role !== "block" && user?.role !== "admin" && (
                <span
                  onClick={() => setShowModal(["Make admin", user?._id])}
                  className="underline text-blue-500 cursor-pointer"
                >
                  make admin
                </span>
              )}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {user?.role === "admin" && user?.role !== "block" ? "" : ""}
              {user?.role === "block" ? (
                <span
                  onClick={() => setShowModal(["unblock", user?._id])}
                  class="bg-red-100 text-red-800 mr-2 px-2.5 py-0.5 rounded cursor-pointer "
                >
                  Unblock
                </span>
              ) : (
                <span
                  onClick={() => setShowModal(["Block", user?._id])}
                  class="bg-red-100 text-red-800 mr-2 px-2.5 py-0.5 rounded cursor-pointer "
                >
                  Block
                </span>
              )}
            </td>
          </tr>
        ))}

        {location?.hotels?.map((hotel, index) => (
          <tr class="bg-gray-100 border-b">
            <td class="px-6 py-4 whitespace-nowrap font-medium ">
              {index + 1}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{hotel?.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">{hotel?.cost}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button onClick={()=>setShowModal(['Update this', hotel?.name, location?.name, form])} className="underline text-blue-500 cursor-pointer">
                Update
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button onClick={()=>setShowModal(['Remove this', hotel?.name, location?.name])} className="bg-red-100 text-red-800 mr-2 px-2.5 py-0.5 rounded cursor-pointer ">
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableDashborad;
