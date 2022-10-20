import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Button from '../Common/Button';
import sundorbon from "../../travel-guru/images/sundorbon.png";
import { useState } from 'react';


const Body = ({setPlace, place}) => {
  
  
  console.log(place);
    return (
        <div className='grid lg:mt-12 grid-cols-1 lg:grid-cols-2 gap-3'>
           <div className='lg:pl-12 px-2 text-white'>
            <h1 className='lg:text-5xl text-2xl font-bold'>{place}</h1>
            <p className='lg:text-xl py-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eius, fuga aspernatur nihil quaerat nisi quia minima iusto magnam rem. Alias eaque, quae ut possimus aperiam optio aliquam deleniti magni totam laudantium nihil explicabo numquam. Assumenda officiis debitis aperiam neque tempora nam asperiores itaque, iste, saepe obcaecati excepturi facilis accusamus?</p>
            <Button>Book a tour</Button>
           </div>
           <div> 
            <Slider
            prevArrow= {<SamplePrevArrow />}
            nextArrow= {<SampleNextArrow />}
          slidesToShow={3}
          swipeToSlide={true}
        >
          <div className='px-0'>
          <div className='relative card-bg mx-2 rounded-xl lg:h-72 h-64 p-3' onDoubleClick={()=>setPlace("Cox's Bazar")}>
            <h1 className='text-white absolute bottom-3 text-lg font-bold'>Cox's Bazar</h1>
          </div>
          </div>
          
          <div className='px-0'>
          <div className='relative card-bg mx-2 rounded-xl lg:h-72 h-64 p-3' onDoubleClick={()=>setPlace("Shundarban")}>
            <h1 className='text-white absolute bottom-3 text-lg font-bold'>main</h1>
          </div>
          </div>
          
          <div className='px-0'>
          <div className='relative card-bg mx-2 rounded-xl lg:h-72 h-64 p-3' onDoubleClick={()=>console.log('main')}>
            <h1 className='text-white absolute bottom-3 text-lg font-bold'>main</h1>
          </div>
          </div>
          
          <div className='px-0'>
          <div className='relative card-bg mx-2 rounded-xl lg:h-72 h-64 p-3' onDoubleClick={()=>console.log('main')}>
            <h1 className='text-white absolute bottom-3 text-lg font-bold'>main</h1>
          </div>
          </div>
          
          
        </Slider>
        </div>
        </div>
    );
};

const SampleNextArrow = (props)  => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none"}}
        onClick={onClick}
      />
    );
}
const SamplePrevArrow = (props)  => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      />
    );
}

export default Body;