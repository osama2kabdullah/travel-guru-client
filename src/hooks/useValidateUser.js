import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";

const useValidateUser = (email) => {
  const [data, setData] = useState('');
  useEffect(() => {
    if (email) {
      fetch("https://travel-guru-server-mocha-nine.vercel.app/validuser/" + email, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [email]);
  return [data];
};

export default useValidateUser;
