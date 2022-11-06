import logo from "./logo.svg";
import "./App.css";
import Header from "./Pages/Common/Header";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import BookDetail from "./Pages/tour/BookDetail";
import { createContext, useEffect, useState } from "react";
import MyBookings from "./Pages/tour/MyBookings";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase.init";
import { useQuery } from "react-query";
import BookHotel from "./Pages/tour/BookHotel";
import HotelDetails from "./Pages/tour/HotelDetails";
import PayBookinng from "./Pages/tour/PayBookinng";

export const AppContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const userAuth = auth;
  useEffect(() => {
    if (userAuth) {
      onAuthStateChanged(userAuth, (user) => {
        user ? setCurrentUser(user) : setCurrentUser("");
      });
    }
  }, [userAuth]);

  return (
    <AppContext.Provider value={currentUser}>
      <div className="max-w-[1480px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/bookdetails" element={<BookDetail />}></Route>
          <Route path="/mybookings" element={<MyBookings />}></Route>
          <Route path="/bookhotel/:name" element={<BookHotel />}></Route>
          <Route path="/bookhotel/:name/:hotelname" element={<HotelDetails/>}></Route>
          <Route path="/pay/:placeName" element={<PayBookinng/>}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
