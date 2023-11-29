
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage ,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,updateUserSuccess,updateUserFailure } from '../redux/user/userSlic'
import { useDispatch } from 'react-redux'
const sty_input = "border p-3 rounded-lg"

export default function Profile() {
  const {currentUser, loading, error} = useSelector((state) =>state.user)
  const fileRef = useRef(null);
  const [file,setfile] = useState(undefined);
  const [filePerc,setfilePerc] = useState(0);
  const [fileUploadError,setfileUploadError] = useState(false);
  const [formData,setformData] = useState({});
  const dispatch = useDispatch();
  // console.log(file);
  // console.log(filePerc);
  // console.log(fileUploadError);
  console.log(formData);
  console.log(loading);
  console.log(error);
  // console.log(currentUser)
  const handleFileUpload = (file)=>{
    const storange = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storange,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      setfilePerc(Math.round(progress));
      console.log('upload is ' + progress)
    },(error)=>{
      setfileUploadError(true)
    }, ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setformData({...formData,avatar:downloadURL})
      })
    });
  }
  const handleChange = (e)=>{
    setformData({...formData, [e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`
      ,{
        method:'POST',
        headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    });
    const data = await res.json();
    
    if(data.success === false){
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));

    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileRef} accept='image/*' hidden/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar?formData.avatar:currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 hover:opacity-90'/>
        <div className='text-sm self-center'>
          <p>
            {fileUploadError ? 
            <span className='text-red-700'>Error Image Upload</span>
            :
              filePerc > 0 && filePerc < 100 ?
              <span className='text-slate-700'>{`Uploading ${filePerc} `}</span> 
              : 
                filePerc ===100?
                <span className='text-green-700'>successfully upload</span>
                :
                  ''
          }
          </p>
        </div>
        <input id='username' type="text" placeholder='username' className={sty_input} defaultValue={currentUser.username} onChange={handleChange}/>
        <input id='email' type="email" placeholder='email' className={sty_input} defaultValue={currentUser.email} onChange={handleChange}/>
        <input id='password' type="password" placeholder='password' className={sty_input} onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 upperca hover:opacity-95
         disabled:opacity-80'>
          {loading? "Loading...":'Update'}
          </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className="text-red-700">{error ? error:""}</p>
    </div>
  )
}
