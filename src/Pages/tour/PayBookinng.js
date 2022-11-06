import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";

const PayBookinng = () => {
  const { placeName } = useParams();

  useEffect(() => {
      fetch("http://localhost:5000/userbookings", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )}`,
        },
      }).then((res) => res.json()).then(data=>{
          data.forEach(element => {
              if(element.toPlace === placeName){
                console.log(element.hotel.Hotelcost);
              }
              
        });
        
      });
  }, []);

  return <div>PayBookinng {placeName}</div>;
};

export default PayBookinng;
