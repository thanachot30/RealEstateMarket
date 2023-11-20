
import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Signout() {
  const [formData,setForDate] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setForDate({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    }catch(error){
      setLoading(false);
      setError(error.message);
    }
      
  }
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" className='border p-3 rounded-lg' placeholder='username' id="username" onChange={handleChange}/>
        <input type="text" className='border p-3 rounded-lg' placeholder='email' id="email" onChange={handleChange}/>
        <input type="text" className='border p-3 rounded-lg' placeholder='password' id="password" onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-ld uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading...":"Sign up"}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}