import React, { useState } from 'react';
import Header from '../Common/Header';
import Body from './Body';
import Rectangle1 from "../../travel-guru/images/Rectangle1.png";

const Home = () => {
    const [place, setPlace] = useState("Cox's Bazar")
  const bannar = {
    backgroundImage: `url(${Rectangle1}),linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
    backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
  const style = `${bannar} h-screen`
    return (
        <section className='h-screen bannar'>
            <Header></Header>
            <Body place={place} setPlace={setPlace}></Body>
        </section>
    );
};

export default Home;