import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlic.js'
import OAuth from '../components/OAuth.jsx';

export default function Signin() {
  const [formData,setForDate] = useState({});
  // const [error,setError] = useState(null);
  // const [loading,setLoading] = useState(false);
  const {loading,error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setForDate({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();

      dispatch(signInStart);

      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    }catch(error){
      dispatch(signInFailure(error.message))
    }
      
  }
  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign in
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" className='border p-3 rounded-lg' placeholder='email' id="email" onChange={handleChange}/>
        <input type="text" className='border p-3 rounded-lg' placeholder='password' id="password" onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-ld uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading...":"Sign in"}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
