import React from 'react';

const AltButton = ({children, icon, btn}) => {
    return (
        <button onClick={()=>btn()} className='p-2 flex border w-full rounded-full'>
            <img className='h-7 float-left w-7' src={icon} alt="" /><p className='mx-auto'>{children}</p>
        </button>
    );
};

export default AltButton;