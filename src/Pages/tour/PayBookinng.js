import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';

const PayBookinng = () => {
    const {placeName} = useParams();
    const currentUser = useContext(AppContext);
    
    
    
    
    return (
        <div>
            PayBookinng {placeName}
        </div>
    );
};

export default PayBookinng;