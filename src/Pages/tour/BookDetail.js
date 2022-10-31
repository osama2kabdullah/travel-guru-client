import React, { useContext } from "react";
import Header from "../Common/Header";
import ahsanManjil from "../../travel-guru/images/places/ahsanManjil.jpg";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BookDetail = () => {
  const { bookData } = useContext(AppContext);
  const {
    picture,
    address,
    FromDate,
    fromPlace,
    latitude,
    longitude,
    toDate,
    toPlace,
  } = bookData;
  console.log(bookData, 'fig');
  const dateCurrection = (date) => {
    const splitDate = date?.split("-");
    const dateStart =
      splitDate?.[1] + "/" + splitDate?.[2] + "/" + splitDate?.[0];
    const date_time = new Date(dateStart);
    return date_time;
  };
  const date_1 = dateCurrection(FromDate);
  const date_2 = dateCurrection(toDate);
  const difference = date_2.getTime() - date_1.getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

  return (
    <section>
      <Header black="black"></Header>
      <div className=" grid grid-cols-2 mx-16">
        <h1 className="text-xl">{TotalDays} {TotalDays > 1 ? 'days':'day'} trip {fromPlace} to {toPlace}</h1>
        <img src={picture} alt="" />
      </div>
    </section>
  );
};

export default BookDetail;
