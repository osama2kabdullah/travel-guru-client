import React from 'react';

const Button = ({children, setBooking}) => {
    return (
        <button
        onClick={()=>setBooking(true)}
        className='bg-orange-300 text-black p-2 px-5 rounded-md hover:bg-orange-400'
        >
            {children}
        </button>
    );
};

export default Button;