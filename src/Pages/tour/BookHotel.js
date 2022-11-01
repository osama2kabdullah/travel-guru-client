import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import useValidateUser from "../../hooks/useValidateUser";
import DivSpinner from "../Common/DivSpinner";
import Header from "../Common/Header";
import PageRequire from "../Common/PageRequire";

const BookHotel = () => {
  const { name } = useParams();
  //context access
  const currentUser = useContext(AppContext);
  const [error, setError] = useState(null);
  
  useEffect(()=>{
    if(currentUser.email){
        fetch('http://localhost:5000/hotels/'+name, {
            method:'GET',
            headers:{
                authorization: `Bearer ${localStorage.getItem('authorization_token')} ${currentUser.email}`
            }
        }).then(res=>res.json()).then(data=>{
          setError(data);
        })
    }
  },[name, currentUser.email])
  
  if(!error){
    return 
  }
  
  if(error.success === false){
    return <PageRequire data={error}/>
  }
  
  return (
    <section>
      <Header black="black" />
      <div>
        <h1 className="my-4 block text-2xl font-bold">Stay in {name}</h1>
      </div>
    </section>
  );
};

export default BookHotel;
