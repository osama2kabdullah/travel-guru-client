import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import Header from '../Common/Header';
import AltLogin from './AltLogin';

const Login = () => {
    const [register, setRegister] = useState(false);
    
    return (
        <section>
            <Header black='black'/>
            <div className='py-16'>
            <form className='border grid gap-8 mx-auto p-12 md:w-2/5 w-10/12 rounded'>
                <h1 className='text-2xl font-bold'>
                    {
                        register ? 'Create an account':'Login'
                    } 
                    </h1>
                
                {
                    register && <>
                    <input className='border-b-2 w-full py-2' placeholder='First name' style={{outline:'none'}} type="firstName" />
                
                <input className='border-b-2 w-full py-2' placeholder='Last name' style={{outline:'none'}} type="lastName" />
                    </>
                }
                
                
                <input className='border-b-2 w-full py-2' placeholder='Username or Email' style={{outline:'none'}} type="email" />
                
                <span>
                    
                <input className='border-b-2 w-full mb-3 py-2' placeholder='Password' style={{outline:'none'}} type="password" />
                
                {
                    register || <div className='flex justify-between'>
                    <div className='flex gap-2'><input type="checkbox" name="remember" id="remember" /><label htmlFor="remember" id="remember">Remember me</label></div>
                    <Link className='underline text-orange-400' to='/forgetpass'>Forget Password</Link>
                    </div>
                }
                
                </span>
                
                {
                    register && <input className='border-b-2 w-full mb-3 py-2' placeholder='Confirm Password' style={{outline:'none'}} type="Confpassword" />
                }
                
                <Button>Login</Button>
                <p className='text-center'>
                 {
                    register ? 'Already have an account?':"Don't have an account?"
                 }    {' '}
                
                <span onClick={()=>setRegister(register ? false:true)} className='underline text-orange-400 cursor-pointer'>{
                    register ? "Login":"Create an account"
                }</span>
                
                </p>
            </form>
            
            <div className='md:w-2/6 w-8/12 mx-auto'>
                <div style={{gridTemplateColumns:'45% 10% 45%'}} className='grid justify-center mt-12 mb-4 text-center items-center'>
                    <span className='h-[1px] bg-gray-300 w-full block'></span>
                    <span>or</span>
                    <span className='h-[1px] bg-gray-300 w-full block'></span>
                </div>
                <AltLogin></AltLogin>
            </div>
            
            </div>
        </section>
    );
};

export default Login;