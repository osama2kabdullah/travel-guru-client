import React from "react";
import TData from "../dashboard/TData";

const TableDashborad = ({ users, setShowModal }) => {
  const thead = ["#", "Email", "Name", "Bookings", "", ""];

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
              {user?.role === "admin" && user?.role !== "block" ? "":''}
              {user?.role === "block" ? (
                <span onClick={() => setShowModal(["unblock", user?._id])} class="bg-red-100 text-red-800 mr-2 px-2.5 py-0.5 rounded cursor-pointer ">
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
      </tbody>
    </>
  );
};

export default TableDashborad;
