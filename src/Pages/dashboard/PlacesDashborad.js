import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../App";
import DashboardTitle from "../Common/DashboardTitle";
import Modal from "../Common/Modal";
import TableDashborad from "../Common/TableDashborad";

const PlacesDashborad = () => {
  const [showModal, setShowModal] = useState();
  const thead = ["#", "Location name", "", ""];
  const currentUser = useContext(AppContext);
  const form = ["name", "about", "latitude", "longitude", "picture"];

  //load places
  const { data: places, refetch } = useQuery("loadplaces", () =>
    fetch("https://travel-guru-server-mocha-nine.vercel.app/allplaces", {
      method: "GET",
      headers: {
        authorization: `Brerer ${localStorage.getItem("authorization_token")} ${
          currentUser?.email
        }`,
      },
    }).then((res) => res.json())
  );
  // refetch
  useEffect(() => {
    if (currentUser?.email) {
      refetch();
    }
  }, [currentUser, refetch]);

  //delete
  const proccedAction = (data) => {
    const ovj = { action: "delete" };
    work(data, ovj);
  };

  //work
  const work = (methods, ovj) => {
    //lets call api
    fetch(`https://travel-guru-server-mocha-nine.vercel.app/actionplace/${methods[1]}/${methods[2]}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")} ${
          currentUser?.email
        }`,
        "content-type": "application/json",
      },
      body: JSON.stringify(ovj),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if (data?.acknowledged) {
          setShowModal();
        }
      });
  };

  const combineArrays = (first, second) => {
    return first.reduce((acc, val, ind) => {
      acc[val] = second[ind];
      return acc;
    }, {});
  };
  const updateOrAdd = (data, methods) => {
    const IMGBB_POST_API_KEY = "9d41b12eb2ac9f38fce3206217aa2abf";
    const formData = new FormData();
    formData.append("image", data.picture.files[0]);
    const url = `https://api.imgbb.com/1/upload?key=${IMGBB_POST_API_KEY}`;
    //save img in imgbb
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        //assign essential data
        // data.picture.file = imageData?.data?.url;
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
        ovj.picture = imageData?.data?.url;
        work(methods, ovj);
      });
  };

  return (
    <>
      <DashboardTitle>Places</DashboardTitle>
      <button
        onClick={() => setShowModal(["Add this", "placename", "add", form])}
        className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
      >
        + Add a place
      </button>
      <div className="md:w-[80vw] h-[83vh] w-[87vw] overflow-scroll">
        <TableDashborad
          form={form}
          places={places}
          thead={thead}
          setShowModal={setShowModal}
        />
      </div>
      <Modal
        proccedAction={proccedAction}
        updateOrAdd={updateOrAdd}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default PlacesDashborad;
