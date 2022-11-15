import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../App";
import DashboardTitle from "../Common/DashboardTitle";
import Modal from "../Common/Modal";
import TableDashborad from "../Common/TableDashborad";

const UsersDashboard = () => {
  const currentUser = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const thead = ["#", "Email", "Name", "Bookings", "", ""];

  //assist function
  const actionFunc = (action, data) => {
    fetch(`https://guarded-ravine-02179.herokuapp.com/${action}/${data[1]}`,{
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('authorization_token')} ${currentUser?.email}`
        },
      }).then(res=>res.json()).then(data=>{
        console.log(data);
        refetch();
        setShowModal(false)
      })
  }
  
  //procced actions
  const proccedAction = (data) => {
    if(data[0] === 'Make admin'){
      actionFunc('makeadmin', data);
    }else if(data[0] === 'Block'){
      actionFunc('block', data);
    }
    else if (data[0] === 'unblock') {
      actionFunc('unblock', data);
    }
  }
  
  //load all users
  const { data, isLoading, refetch } = useQuery("loadusers", () =>
    fetch("https://guarded-ravine-02179.herokuapp.com/allusers", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")} ${
          currentUser.email
        }`,
      },
    }).then((res) => res.json())
  );

  useEffect(() => {
    if (currentUser?.email) {
      refetch();
    }
  }, [currentUser, refetch]);

  
  return (
    <section className="overflow-hidden">
      <DashboardTitle>Users</DashboardTitle>
      <div className="md:w-[80vw] h-[83vh] w-[87vw] overflow-scroll">
        <TableDashborad
          setShowModal={setShowModal}
          thead={thead}
          users={data}
          isLoading={isLoading}
        />
      </div>

      <Modal proccedAction={proccedAction} showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default UsersDashboard;
