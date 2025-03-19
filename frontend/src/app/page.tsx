"use client"
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import { getErrorMessage } from '@/utils/getErrorMessage'

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useRouter();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/a1/auth/login', {
        username,
        password
      });
  
      const token = response.data.token;
      const userRole = response.data.user.role_id;

      await axios.post('/service/set-token', { token });
      toast.success(response.data.message, {
        'autoClose': 2000,
        'theme': 'colored'
      });

      if (userRole == 1) {
        setTimeout(() => {
          navigate.push('/admin/home');
        }, 3000);
      } else if (userRole == 2) {
        setTimeout(() => {
          navigate.push('/user/home');
        }, 3000);
      }

    } catch (error: unknown) {
      toast.error(getErrorMessage(error), {
        'autoClose': 2000,
        'theme': 'colored'
      })
    }
  }

  return (
    <div className='font-poppins flex justify-center items-center h-screen w-full'>
      <div className="bg-white w-[500px] h-[550px] rounded-md p-12 flex justify-start items-center flex-col">
        <div className="text-center">
          <h1 className='font-[600] text-[28px] text-primary'>Sign in</h1>
          <p className='font-[500] pt-1 text-[16px]'>Please Input Your Username and Password</p>
        </div>
        <div className="flex flex-col gap-6 justify-center mt-10">
          <div className="flex flex-col gap-2">
            <label className='font-[500] text-[16px]'>Username:</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
              placeholder='Enter Your Username'
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className='font-[500] text-[16px]'>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
              placeholder='Enter Your Password'
            />
          </div>
        </div>
        <div className="mt-14 gap-4 flex justify-center flex-col items-center">
          <button onClick={handleLogin} className='bg-primary text-white font-[500] text-[16px] w-[350px] cursor-pointer py-3 duration-200 rounded-md hover:bg-transparent hover:text-primary border-3 border-primary'>Login</button>
          <p className='text-[14px] font-[500]'>Don&lsquo;t have an account? 
            <Link href='/register'> 
              <span className='text-primary underline italic'> Register here</span>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}