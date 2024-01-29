import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const {isAuth,setIsAuth} = useAuth();

    const handleEmail = (e)=>{
        setEmail(e.target.value);
        // console.log(username);
    }


    const handlePassword = (e)=>{
        setPassword(e.target.value);
        // console.log(password);
    }


    const ProceedLogin = (e) =>{
        e.preventDefault();
        if(validate()){
            // console.log('proceed')
            fetch("http://localhost:3000/user/"+email).then((res)=>{
                return res.json();
            }).then((resp)=>{
                console.log(resp)
                if(Object.keys(resp).length===0){
                    toast.error('Please Enter a valid email')
                }else{
                    if(resp.password === password){
                        toast.success("Successfull Login !")
                        setIsAuth(true);
                        console.log(isAuth);
                        navigate('/')
                    }else{
                        toast.error('please enter valid credentials')
                    }
                }
            }).catch((err)=>{
                toast.error('Login Failed due to :'+err.message)
            });
        }
    }
    const validate = ()=>{
        let result = true;
        if(email === '' || email ===null){
            result = false;
            toast.warning('Please Enter a valid Email')
        }
        if(password === '' || password ===null){
            result = false;
            toast.warning('Please Enter a valid Password')
        }
        return result;
    }
  return (
    <>
    <div className='h-screen w-[100%] bg-gray-300 flex justify-center items-center  '>
        <div className='w-[30%] max-[330px]:w-[90%] max-[770px]:w-[60%] h-64 bg-white flex pl-5 items-left text-left p-3 shadow-2xl rounded'>

            <div>
                <form onSubmit={ProceedLogin}>

                <h3 className='text-xl font-semibold '>Login</h3>
                <br />
                <label htmlFor="email">Email:</label><br />
                <input value={email} onChange={handleEmail}className='lg:w-64 border-2 rounded-sm p-1'type="email" name="email" id="email" placeholder='Enter email' />
                <br />
                <label htmlFor="password">Password:</label><br />
                <input value={password} onChange={handlePassword} type="password" name="pass" id="password" className='lg:w-64 border-2 rounded-sm p-1' placeholder='Enter password' /><br /><br />             
               <button className='text-sm bg-gray-300 w-24 rounded h-10 font-semibold '  >Submit</button>
               <a className='text-xs hover:cursor-pointer ml-4 text-gray-500 hover:underline' onClick={()=> navigate('/register')}>Not Registered ? click here</a>
                
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login