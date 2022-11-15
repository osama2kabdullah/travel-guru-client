import React from 'react';

const TotalDays = ({toDate, FromDate}) => {
    const difference = new Date(toDate).getTime() - new Date(FromDate).getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    return (
        <>
            {TotalDays}
        </>
    );
};

export default TotalDays;