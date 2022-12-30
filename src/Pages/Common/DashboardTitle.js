import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Button from "./Button";

const DashboardTitle = ({ children }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        localStorage.removeItem("authorization_token");
        navigate("/login");
      })
      .catch((error) => {
        console.log("An error happened");
      });
  };
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl  font-bold mb-5">{children}</h1>
      <Button btn={handleSignout}>Logout</Button>
    </div>
  );
};

export default DashboardTitle;
