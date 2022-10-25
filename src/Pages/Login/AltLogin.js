import React from 'react';
import AltButton from './AltButton';
import fb from "../../travel-guru/images/icons/fb.png";
import google from "../../travel-guru/images/icons/google.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "../../firebase.init";


const AltLogin = () => {
    const Gprovider = new GoogleAuthProvider();
    
    const handleGLogin = e => {
        signInWithPopup(auth, Gprovider)
        .then(result=>{
            console.log(result.user);
        })
        .then(error=>{
            console.log(error);
        })
    }
    const handleFLogin = ()=> {
        console.log('face login');
    }
    
    return (
        <div className='grid gap-3'>
            <AltButton btn={handleFLogin} icon={fb}>Continue with Facebook</AltButton>
            <AltButton btn={handleGLogin} icon={google}>Continue with Google</AltButton>
        </div>
    );
};

export default AltLogin;