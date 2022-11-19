import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../App";
import DashboardTitle from "../Common/DashboardTitle";
import Modal from "../Common/Modal";
import TableDashborad from "../Common/TableDashborad";

const HotelsDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeletModal] = useState(false);
  const thead = ["#", "Hotel Name", "Cost/Night", "", ""];
  const form = [
    "name",
    "about",
    "cost",
    "address",
    "company",
    "email",
    "latitude",
    "longitude",
    "picture",
  ];
  const currentUser = useContext(AppContext);
  const { data, isLoading, refetch } = useQuery("loadAllHotels", () =>
    fetch("http://localhost:5000/allhotels", {
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
  }, [currentUser?.email, refetch]);

  const combineArrays = (first, second) => {
    return first.reduce((acc, val, ind) => {
      acc[val] = second[ind];
      return acc;
    }, {});
  };
  
  //delete
  const proccedAction = (data) => {
    const ovj = {action: 'delete'}
    work(data, ovj);
  }
  
  //WORK
  const work = (methods, ovj) => {
    //lets call api
    fetch(
      `http://localhost:5000/actionhotel/${methods[2]}/${methods[0]}/${methods[1]}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )} ${currentUser?.email}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(ovj),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if(data?.acknowledged){
          setShowModal();
        }
      });
  }

  //update or add
  const updateOrAdd = (data, methods) => {
    const keys = form.map((form) => data?.[form]?.name);
    const values = form.map((form) => data?.[form]?.value);
    const object = combineArrays(keys, values);

    let ovj;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (!object[key]) {
          delete object[key];
        }
        ovj = object;
      }
    }
    work(methods, ovj);
  };

  return (
    <>
      <DashboardTitle>Hotels</DashboardTitle>
      <div className="md:w-[80vw] h-[83vh] w-[87vw] overflow-scroll">
        {data?.map((location) => (
          <>
            <div className="flex mt-12 gap-6 items-center">
              <h3 className="text-xl">{location.name}</h3>
              <button
                onClick={() =>
                  setShowModal(["Add this", "adding", location.name, form])
                }
                className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                + Add a Hotel
              </button>
            </div>
            <TableDashborad
            form={form}
              setShowModal={setShowModal}
              location={location}
              thead={thead}
            />
          </>
        ))}
      </div>
      <Modal
      proccedAction={proccedAction}
        updateOrAdd={updateOrAdd}
        form={form}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default HotelsDashboard;
