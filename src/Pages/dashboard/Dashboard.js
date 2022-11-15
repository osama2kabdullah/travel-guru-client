import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";
import { AppContext } from "../../App";
import fb from "../../travel-guru/images/icons/fb.png";
import Modal from "../Common/Modal";

const Dashboard = ({ currentUser }) => {
  const [openLink, setOpenLink] = useState(true);

  return (
    <section className="flex">
      <div
        className={`md:block md:w-2/6 w-3/6 ${
          openLink && "hidden"
        } md:relative absolute bg-gray-100 h-screen`}
      >
        <div className="flex justify-around items-center flex-wrap">
          <img
            className="w-32"
            src="https://i.picsum.photos/id/517/200/200.jpg?hmac=7n69zdD4qSZs14zMRZPUfLGKHFEIR9jTpoSEN1o990E"
            alt=""
          />
          <h1 className="text-xl font-bold">{currentUser?.email}</h1>
        </div>

        <div className="p-2 leading-9">
          <SideNave to="">Users</SideNave>
          <SideNave to="tours">tours</SideNave>
          <SideNave to="hotels">Hotels</SideNave>
          <SideNave to="places">places</SideNave>
        </div>
      </div>

      <button
        onClick={() => setOpenLink(!openLink)}
        className="md:hidden absolute bottom-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="p-5">
        <Outlet />
      </div>
 
    </section>
  );
};

const SideNave = ({ children, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={`text-lg block ${
        match ? "bg-orange-400" : "bg-white"
      } p-2 rounded-md cursor-pointer my-2`}
    >
      {children}
    </Link>
  );
};

export default Dashboard;
