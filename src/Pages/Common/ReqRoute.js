import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import useValidateUser from "../../hooks/useValidateUser";
import DivSpinner from "./DivSpinner";

const ReqRoute = ({ children }) => {
  //acces context
  const currentUser = useContext(AppContext);
  const location = useLocation();
  const [data, isLoading] = useValidateUser(currentUser?.email);
  if (isLoading || !currentUser) {
    return <DivSpinner />;
  }

  return data?.valid && currentUser ? (
    children
  ) : (
    <Navigate state={{ from: location }} replace to={"/login"} />
  );
};

export default ReqRoute;
