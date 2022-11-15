import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AppContext } from "../../App";

const TData = ({email}) => {
  const currentUser = useContext(AppContext);
  const [count, setCount] = useState(0);
  useEffect(()=>{
    fetch("https://guarded-ravine-02179.herokuapp.com/userbookingscount/"+ email, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("authorization_token")} ${
            currentUser?.email
          }`,
        },
      }).then((res) => res.json()).then(data=>{
        setCount(data);
      })
  },[email, currentUser?.email])
  
  return <p>{count.count}</p>
};

export default TData;
