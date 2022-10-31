import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";

const useValidateUser = (email) => {
  const { data, isLoading } = useQuery("validateuser", () =>
    fetch("http://localhost:5000/validuser/" + email, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authorization_token")}`,
      },
    }).then((res) => res.json())
  );
  return [data, isLoading];
};

export default useValidateUser;
