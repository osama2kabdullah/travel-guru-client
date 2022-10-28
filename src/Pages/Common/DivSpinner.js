import React from 'react';

const DivSpinner = () => {
    return (
        <div style={{backgroundColor: 'rgba(247, 247, 247, 0.699)'}} className="absolute bg-red-300 w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div></div>
    );
};

export default DivSpinner;