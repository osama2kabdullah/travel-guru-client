import React from 'react';

const DashboardTitle = ({children}) => {
    return (
        <h1 className='text-2xl font-bold mb-5'>
            {children}
        </h1>
    );
};

export default DashboardTitle;