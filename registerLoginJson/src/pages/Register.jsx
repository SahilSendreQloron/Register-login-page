// import React, { useState } from 'react'
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// function Register() {

//     const [id,setId] = useState('');
//     const [password,setPassword] = useState('');
//     const [gender,setGender] = useState("male");
//     const [ConfirmPassword,setConfirmPassword] = useState('');
//     const navigate = useNavigate();


//     const handleSubmit = (e)=>{
//         e.preventDefault();
        
//         let regobj = {id,password,gender}
//         console.log(regobj)

//         fetch("http://localhost:3000/user",{
//             method: "POST",
//             headers:{'content-type':'application/json'},
//             body:JSON.stringify(regobj)
//         }).then((res)=>{
//             toast.success("Registered Successfully !")

//         }).catch((err)=>{
//             toast.error("Failed :" +err.message ) 
//         })
//         navigate('/login')
//         console.log('working submit button')
        
//     }

//     const handleId = (e)=>{
//         setId(e.target.value);
//     }

//     const handleregPassword = (e)=>{
//         setPassword(e.target.value);
//     }

//     const handleGender = (e)=>{
//         setGender(e.target.value);
//     }

//     const handleConPass = (e)=>{
//         setConfirmPassword(e.target.value);
        
//     }

//     function validatePassword(){
//         if(password != confirmPassword) {
//             toast.warn('passwords do not match !')
//         } else {
//             confirmPassword.setCustomValidity('');
//         }
//       }


//   return (
//     <div className=''>
        
//         <div className='h-screen w-[100%] bg-gray-300 flex justify-center items-center  '>
//         <div className='w-[50%] max-[330px]:w-[90%] max-[770px]:w-[60%] h-[60%] bg-white flex pl-5 items-center text-left shadow-2xl rounded'>

//             <div className='w-[100%] '>
//                 <form onSubmit={handleSubmit}>

//                 <h3 className='text-xl font-semibold '>Register</h3>
//                 <br />
//                 <label htmlFor="email">Email:</label><br />
//                 <input 
//                  required
//                  value={id}
//                  className='lg:w-[90%] border-2 rounded-sm p-1'
//                  type="email" 
//                  name="email" 
//                  id="email" 
//                  placeholder='Enter email' 
//                  onChange={handleId}
//                  />
//                 <br />
//                 <label htmlFor="pass">Password:</label><br />
//                 <input 
//                 required 
//                 value={password}
//                 className='lg:w-[90%] border-2 rounded-sm p-1'
//                 type="password" 
//                 name="pass" 
//                 id="pass" 
//                 placeholder='Enter password' 
//                 onChange={handleregPassword}
//                 />
//                 <br />
//                 <label htmlFor="conpass">Confirm Password:</label><br />
//                 <input 
//                 required 
//                 value={ConfirmPassword}
//                 className='lg:w-[90%] border-2 rounded-sm p-1'
//                 type="password" 
//                 name="pass" 
//                 id="conpass" 
//                 placeholder='Enter password' 
//                 onChange={handleConPass}
//                 />
//                 <br />
                
//                 <label htmlFor="gender">Gender:</label><br />
//                 <input 
//                 type="radio" 
//                 name="gender" 
//                 checked={gender==='male'}
//                 onChange={handleGender}
//                 value="male"
//                 /> Male
//                 &nbsp;
//                 <input 
//                 type="radio" 
//                 name="gender" 
//                 checked={gender==='female'}
//                 onChange={handleGender} 
//                 value="female"
//                 /> Female<br /><br />
//                 <button className='text-sm bg-gray-300 w-24 rounded h-10 font-semibold '  >Submit</button>
//                 <br />
//                 <br />
//                 <Link to='/login'>
//                 <p className=' text-left text-xs hover:cursor-pointer ml-4 text-gray-500 hover:underline'>Already Registered ? Click here</p>
//                 </Link>
//                 {/* <button className='text-sm bg-gray-400 w-24 rounded h-10 font-semibold ml-2'  >Go back</button> */}
//                 </form>
//             </div>
//         </div>
//     </div>

//     </div>
//   )
// }

// export default Register

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

function Register() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Password validation
        if (!validatePassword()) {
            return;
        }

        let regobj = { id, password, gender };
        console.log(regobj);

        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(regobj),
        })
            .then((res) => {
                toast.success('Registered Successfully!');
            })
            .catch((err) => {
                toast.error('Failed: ' + err.message);
            });

        navigate('/login');
        console.log('working submit button');
    };

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handleregPassword = (e) => {
        setPassword(e.target.value);
        validatePassword();
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleConPass = (e) => {
        setConfirmPassword(e.target.value);
        validatePassword();
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordWarning('Password must be at least 8 characters long.');
            return false;
        } else {
            setPasswordWarning('');
        }

        if (!/[a-z]/.test(password)) {
            setPasswordWarning('Password must contain at least 1 lowercase letter.');
            return false;
        } else {
            setPasswordWarning('');
        }

        if (!/[A-Z]/.test(password)) {
            setPasswordWarning('Password must contain at least 1 uppercase letter.');
            return false;
        } else {
            setPasswordWarning('');
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            setPasswordWarning('Password must contain at least 1 special character.');
            return false;
        } else {
            setPasswordWarning('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordWarning('Passwords do not match!');
            return false;
        } else {
            setConfirmPasswordWarning('');
        }

        return true;
    };

    return (
        <div className=''>
            <div className='h-screen w-[100%] bg-gray-300 flex justify-center items-center  '>
                <div className='w-[50%] max-[330px]:w-[90%] max-[770px]:w-[60%] h-[70%] bg-white flex pl-5 items-center text-left shadow-2xl rounded'>
                    <div className='w-[100%] '>
                        <form onSubmit={handleSubmit}>
                            <h3 className='text-xl font-semibold '>Register</h3>
                            <br />
                            <label htmlFor='email'>Email:</label>
                            <br />
                            <input
                                required
                                value={id}
                                className='lg:w-[90%] border-2 rounded-sm p-1'
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter email'
                                onChange={handleId}
                            />
                            <br />
                            <label htmlFor='pass'>Password:</label>
                            <br />
                            <input
                                required
                                value={password}
                                className='lg:w-[90%] border-2 rounded-sm p-1'
                                type='password'
                                name='pass'
                                id='pass'
                                placeholder='Enter password'
                                onChange={handleregPassword}
                            />
                            <br />
                            <span style={{ color: 'red' }}>{passwordWarning}</span>
                            <br />
                            <label htmlFor='conpass'>Confirm Password:</label>
                            <br />
                            <input
                                required
                                value={confirmPassword}
                                className='lg:w-[90%] border-2 rounded-sm p-1'
                                type='password'
                                name='pass'
                                id='conpass'
                                placeholder='Enter password'
                                onChange={handleConPass}
                            />
                            <br />
                            <span style={{ color: 'red' }}>{confirmPasswordWarning}</span>
                            <br />
                            <label htmlFor='gender'>Gender:</label>
                            <br />
                            <input
                                type='radio'
                                name='gender'
                                checked={gender === 'male'}
                                onChange={handleGender}
                                value='male'
                            />{' '}
                            Male
                            &nbsp;
                            <input
                                type='radio'
                                name='gender'
                                checked={gender === 'female'}
                                onChange={handleGender}
                                value='female'
                            />{' '}
                            Female
                            <br />
                            <br />
                            <button className='text-sm bg-gray-300 w-24 rounded h-10 font-semibold '>
                                Submit
                            </button>
                            <br />
                            <br />
                            <Link to='/login'>
                                <p className=' text-left text-xs hover:cursor-pointer ml-4 text-gray-500 hover:underline'>
                                    Already Registered ? Click here
                                </p>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
