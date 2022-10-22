import React, { useState } from "react";
import Header from "../Common/Header";
import Body from "./Body";
import Rectangle1 from "../../travel-guru/images/Rectangle1.png";

const Home = () => {
  const defaultPlace = {
    _id: "6351fbebc395139755c302d5",
    picture: "https://i.ibb.co/HggZJtk/shundarban.jpg",
    name: "Sundarbans",
    address: "913 Rost Place, Enlow, New Hampshire, 3149",
    about:
      "Sundarbans has declared World Heritage Site by UNESCO which is the largest Mangrove Forest situated between two countries. It is the kingdom of Royal Bengal tiger and you will find various kinds of species of birds, animals & plants and I think you should visit the tranquilizing beauty of Sundarbans once in your life.",
    latitude: 7.307021,
    longitude: -140.445088,
  };
  const [place, setPlace] = useState(defaultPlace);
  const bannar = {
    backgroundImage: `url(${place.picture}),linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
    backgroundBlendMode: "overlay",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <section style={bannar} className="h-screen">
      <Header></Header>
      <Body place={place} setPlace={setPlace}></Body>
    </section>
  );
};

export default Home;
