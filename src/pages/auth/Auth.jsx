import React, { useEffect } from 'react';
import { provider, auth } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo.js';

const Auth = () => {

  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  } 

  if (isAuth) {
    return <Navigate to='/expense-tracker' />
  }

  return (
    <div className='flex flex-col h-screen text-center bg-[#DDD0C8]'>
      <p className='mt-4 text-2xl font-bold underline'>Expense Tracker Application</p>
      <div className='flex flex-col justify-center items-center flex-grow'>
        <button className='bg-[#323232] rounded-lg p-2 px-4 text-white text-lg flex justify-center items-center hover:bg-[#252525] hover:text-[#EEEEEE]' onClick={signInWithGoogle}>
          <img className='mr-4' src ='https://d35aaqx5ub95lt.cloudfront.net/images/7da752378a3b1b8bbcd94a4d4f10561e.svg'/>
          Sign In With Google
          </button>
      </div>
    </div>
  )
}

export default Auth
