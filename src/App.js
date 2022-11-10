import logo from "./logo.svg";
import "./App.css";
import Header from "./Pages/Common/Header";
import Home from "./Pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Dashboard from "./Pages/dashboard/Dashboard";

export const AppContext = createContext();

function App() {
  const [admin, seAdmin] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const userAuth = auth;
  useEffect(() => {
    if (userAuth) {
      onAuthStateChanged(userAuth, (user) => {
        user ? setCurrentUser(user) : setCurrentUser("");
      });
    }
  }, [userAuth]);
  
  useEffect(()=>{
    if(currentUser?.email){
      fetch('http://localhost:5000/admin/'+currentUser.email, {
        method:'GET',
        headers: {
          authorization:`Bearer ${localStorage.getItem('authorization_token')}`
        }
      }).then(res=>res.json()).then(data=>{
        seAdmin(data.admin);
      })
    }
  },[currentUser])

  if(admin){
    return <Dashboard currentUser={currentUser}/>
  }
  
  return (
    <AppContext.Provider value={currentUser}>
      <div className="max-w-[1480px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/bookdetails" element={<BookDetail />}></Route>
          <Route path="/mybookings" element={<MyBookings />}></Route>
          <Route path="/:name/bookhotel/:id" element={<BookHotel />}></Route>
          <Route path="/bookhotel/:name/:hotelname/:bookingId" element={<HotelDetails/>}></Route>
          <Route path="/pay/:placeName" element={<PayBookinng/>}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
