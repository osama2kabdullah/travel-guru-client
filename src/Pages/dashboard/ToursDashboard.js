import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../App";
import DashboardTitle from "../Common/DashboardTitle";
import TableDashborad from "../Common/TableDashborad";

const ToursDashboard = () => {
  const currentUser = useContext(AppContext);
  const [filter, setFilter] = useState('Generel');
  
  const thead = [
    "#",
    "Email",
    "To",
    "From",
    "End Date",
    "Total Days",
    "Hotel",
    "Total cost",
    "Payment",
  ];
  const { data, isLoading, refetch } = useQuery("loadAllBookings", () =>
    fetch("https://travel-guru-server-mocha-nine.vercel.app/allbookings/"+filter, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")} ${
          currentUser?.email
        }`,
      },
    }).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [currentUser, refetch, filter]);
  
  const paid = data?.filter((booking) => booking?.payStatus === true);
  
  return (
    <div>
      <DashboardTitle>Tours</DashboardTitle>
      <div className="flex p-3 justify-between flex-wrap">
        
        <div className="flex gap-5">
            <span>Paid: {paid?.length}</span>
            <span>Unpaid: {data?.length - paid?.length}</span>
        </div>
        
        <select onChange={e=>setFilter(e.target.value)} id="">
            <option value='Generel'>Generel</option>
            <option value='Old'>Old</option>
        </select>
        
      </div>
      
      <div className="md:w-[80vw] h-[83vh] w-[87vw] overflow-scroll">
        <TableDashborad bookings={data} thead={thead} />
      </div>
    </div>
  );
};

export default ToursDashboard;
