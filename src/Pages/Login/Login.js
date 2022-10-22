import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import Header from '../Common/Header';
import AltLogin from './AltLogin';

const Login = () => {
    return (
        <section>
            <Header black='black'/>
            <div className='flex items-center h-[80vh]'>
            <form className='border grid gap-8 mx-auto p-12 md:w-2/5 w-10/12 rounded'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <input className='border-b-2 w-full py-2' placeholder='Username or Email' style={{outline:'none'}} type="email" />
                <span>
                <input className='border-b-2 w-full mb-3 py-2' placeholder='Password' style={{outline:'none'}} type="password" />
                <div className='flex justify-between'>
                <div className='flex gap-2'><input type="checkbox" name="remember" id="remember" /><label htmlFor="remember" id="remember">Remember me</label></div>
                <Link className='underline text-orange-400' to='/forgetpass'>Forget Password</Link>
                </div>
                </span>
                <Button>Login</Button>
                <p className='text-center'>Don't have an account? <span className='underline text-orange-400'>Create an account</span></p>
            </form>
            </div>
            
            <div className='md:w-2/6 w-8/12 mx-auto'>
                <div style={{gridTemplateColumns:'45% 10% 45%'}} className='grid justify-center mb-4 text-center items-center'>
                    <span className='h-[1px] bg-gray-300 w-full block'></span>
                    <span>or</span>
                    <span className='h-[1px] bg-gray-300 w-full block'></span>
                </div>
                <AltLogin></AltLogin>
            </div>
            
        </section>
    );
};

export default Login;