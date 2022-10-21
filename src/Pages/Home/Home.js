import React, { useState } from 'react';
import Header from '../Common/Header';
import Body from './Body';
import Rectangle1 from "../../travel-guru/images/Rectangle1.png";

const Home = () => {
    const [place, setPlace] = useState("Cox's Bazar");
  const bannar = {
    backgroundImage: `url(${place.picture}),linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
    backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };
    return (
        <section style={bannar} className='h-screen'>
            <Header></Header>
            <Body place={place} setPlace={setPlace}></Body>
        </section>
    );
};

export default Home;