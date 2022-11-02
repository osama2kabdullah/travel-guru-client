import React from "react";
import Rectangle1 from "../../travel-guru/images/Rectangle1.png";

const HotelCard = ({ hotel }) => {
  const { name, review, faclities, cost, company, about } = hotel;
  
  return (
    <div className="grid gap-5 md:flex">
      <img className="rounded-xl h-32" src={Rectangle1} alt="" />
      <div>
        <h3 className="text-xl font-medium">{name}</h3>
        
        <div className="flex font-medium gap-3 text-gray-600 flex-wrap">
            {
                faclities.map(facilty=><span>{facilty}</span>)
            }
        </div>
        <p>{about}</p>
        <div className="flex justify-between">
        <p><svg aria-hidden="true" className="w-5 h-5 inline text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>{review}</p>
        <p>{cost}/night</p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
