import React from "react";
import { useContext } from "react";
import { AppContext } from "../../App";

const Dashboard = ({currentUser}) => {
    
    console.log(currentUser.email);
    
  return (
    <section className="grid" style={{ gridTemplateColumns: "25% 75%" }}>
        
      <div className={`md:block  bg-gray-100 h-screen`}>
        <div className="flex justify-around items-center flex-wrap">
            {/* avatar */}
          
          <img
            data-tooltip-target="tooltip-jese"
            class="w-10 h-10 rounded"
            src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_1280.png"
            alt="Medium avatar"
          />
          <h1 className="text-xl font-bold">{currentUser.email}</h1>
        </div>
      </div>
      <div>
        
      <button>
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
          
        hello
        </div>
    </section>
  );
};

export default Dashboard;
