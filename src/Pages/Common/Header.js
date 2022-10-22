import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../travel-guru/logo.png";
import Button from "./Button";

const Header = ({black}) => {
  const [openNav, setOpenNav] = useState(false);

  const secondNav = `absolute ${
    openNav || "hidden"
  } left-0 top-0 h-auto flex flex-col pt-5 px-12 gap-8 w-full bg- pb-12 z-30 text-black bg-white`;

  return (
    <div className="flex w-11/12 lg:py-8 py-3 gap-2 mx-auto justify-between items-center">
      <img className="h-16" src={logo} alt="" />
      <nav style={{color:`${black}`}} className="flex items-center lg:gap-12 gap-5 text-white">
        {/* search input */}
        <div
          style={{ backgroundColor: "rgba(158, 158, 158, 0.52)" }}
          className="border-2 p-1 w-4/5 flex items-center gap-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            style={{ outline: "none" }}
            className="bg-red-300 w-4/5 bg-transparent"
            type="text"
            placeholder="Search aa place"
          />
        </div>

        {/* firsst nav */}
        <button onClick={() => setOpenNav(true)} className="lg:hidden block">
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

        <div className="lg:flex items-center gap-12 hidden">
          <Navlinks></Navlinks>
        </div>

        {/* second nav  */}
        <div className={secondNav}>
          <button onClick={() => setOpenNav(false)} className="fixed right-5">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col gap-8 pt-14">
            <Navlinks></Navlinks>
          </div>
        </div>
      </nav>
    </div>
  );
};

const Navlinks = () => {
  return (
    <>
      <Link>Home</Link>
      <Link>Home</Link>
      <Link>Home</Link>
      <Link>Home</Link>
      <Link to='/login'>
        <Button>Login</Button>
      </Link>
    </>
  );
};

const Svg = (d) => {
  return (
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
  );
};

export default Header;
