import React from 'react';
import AltButton from './AltButton';
import fb from "../../travel-guru/images/icons/fb.png";
import google from "../../travel-guru/images/icons/google.png";

const AltLogin = () => {
    return (
        <div className='grid gap-3'>
            <AltButton icon={fb}>Continue with Facebook</AltButton>
            <AltButton icon={google}>Continue with Google</AltButton>
        </div>
    );
};

export default AltLogin;