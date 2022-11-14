import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../App";
import DashboardTitle from "../Common/DashboardTitle";
import TableDashborad from "../Common/TableDashborad";

const UsersDashboard = () => {
  const currentUser = useContext(AppContext);
  const [users, setUsers] = useState([]);

  const { data, isLoading, refetch } = useQuery("loadusers", () =>
    fetch("http://localhost:5000/allusers", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")} ${
          currentUser.email
        }`,
      },
    }).then((res) => res.json())
  );
  
  useEffect(()=>{
    if(currentUser?.email){
      refetch();
    }
  },[currentUser, refetch])

  return (
    <section className="overflow-hidden">
      <DashboardTitle>Users</DashboardTitle>
      <div className="md:w-[80vw] h-[83vh] w-[87vw] overflow-scroll">
        <TableDashborad users={data} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default UsersDashboard;
