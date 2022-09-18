import React from "react";
import { Link } from "react-router-dom";
import logo from "../../travel-guru/logo.png";
import Button from "./Button";

const Header = () => {
  return (
    <section className="flex gap-16 mx-[135px] py-[35px] items-center justify-between">
      <img className="h-[56px]" src={logo} alt="" />
      <nav className="flex text-white items-center gap-12">
        <div className="flex items-center border-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 inline h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            className="px-2 rounded-md outline-none bg-transparent h-[44px] w-[370px]"
            type="text"
          />
        </div>
        <Link>News</Link>
        <Link>Destination</Link>
        <Link>Blog</Link>
        <Link>Contact</Link>
        <Button>Login</Button>
      </nav>
    </section>
  );
};

export default Header;
