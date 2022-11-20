import "./App.css";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase.init";
import { useQuery } from "react-query";
import DivSpinner from "./Pages/Common/DivSpinner";
//LAZY
const PayBookinng = lazy(() => import("./Pages/tour/PayBookinng"));
const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard"));
const PlacesDashborad = lazy(() => import("./Pages/dashboard/PlacesDashborad"));
const UsersDashboard = lazy(() => import("./Pages/dashboard/UsersDashboard"));
const HotelsDashboard = lazy(() => import("./Pages/dashboard/HotelsDashboard"));
const ToursDashboard = lazy(() => import("./Pages/dashboard/ToursDashboard"));
const MyBookings = lazy(() => import("./Pages/tour/MyBookings"));
const BookHotel = lazy(() => import("./Pages/tour/BookHotel"));
const HotelDetails = lazy(() => import("./Pages/tour/HotelDetails"));
const Login = lazy(() => import("./Pages/Login/Login"));
const BookDetail = lazy(() => import("./Pages/tour/BookDetail"));
const Home = lazy(() => import("./Pages/Home/Home"));

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

  useEffect(() => {
    if (currentUser?.email) {
      fetch("http://localhost:5000/admin/", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "authorization_token"
          )} ${currentUser.email}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          seAdmin(data.admin);
        });
    }
  }, [currentUser?.email]);

  return (
    <AppContext.Provider value={currentUser}>
      <div className="max-w-[1480px] mx-auto">
        <Suspense fallback={<DivSpinner/>}>
          <Routes>
            <Route path="/" element={admin ? <Dashboard /> : <Home />}>
              {/* for admin */}
              <Route path="" element={<UsersDashboard />} />
              <Route path="hotels" element={<HotelsDashboard />} />
              <Route path="tours" element={<ToursDashboard />} />
              <Route path="places" element={<PlacesDashborad />} />
              {/* for admin */}
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/bookdetails" element={<BookDetail />}></Route>
            <Route path="/mybookings" element={<MyBookings />}></Route>
            <Route path="/:name/bookhotel/:id" element={<BookHotel />}></Route>
            <Route
              path="/bookhotel/:name/:hotelname/:bookingId"
              element={<HotelDetails />}
            ></Route>
            <Route path="/pay/:bookingId" element={<PayBookinng />}></Route>
          </Routes>
        </Suspense>
      </div>
    </AppContext.Provider>
  );
}

export default App;
