import React from 'react';
import PlaceCard from '../Common/PlaceCard';
import PlaceDeatilCard from '../Common/PlaceDeatilCard';

const Body = () => {
    return (
        <div className='py-[50px] grid grid-cols-2'>
            <div className='px-5 ml-16'>
                <PlaceDeatilCard></PlaceDeatilCard>
            </div>
            <div className='flex gap-5'>
            <PlaceCard></PlaceCard>
            <PlaceCard></PlaceCard>
            <PlaceCard></PlaceCard>
            </div>
        </div>
    );
};

export default Body;