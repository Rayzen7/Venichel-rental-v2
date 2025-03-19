"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getErrorMessage } from '@/utils/getErrorMessage'
import Swal from 'sweetalert2'

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [no_ktp, setKTP] = useState('');
  const [date_of_birth, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDesc] = useState('');
  const navigate = useRouter();

  useEffect(() => {
    setPhone('+62');
  }, []);
  
  const handleRegister = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/a1/register', {
        username,
        password,
        name,
        phone,
        email,
        no_ktp,
        date_of_birth,
        description
      });

      Swal.fire({
        title: response.data.message,
        text: 'You can be redirect to Login Page',
        icon: 'success',
        confirmButtonText: 'Success',
        confirmButtonColor: '#16A34A'
      }).then((success) => {
        if (success.isConfirmed) {
            navigate.push('/');
        }
      });

      setTimeout(() => {
        navigate.push('/');
      }, 3000);

    } catch (error: unknown) {
        Swal.fire({
            title: getErrorMessage(error),
            text: 'You can be redirect to Login Page',
            icon: 'error',
            confirmButtonText: 'Error',
            confirmButtonColor: '#DC2626'
        });
    }
  }  

  return (
    <div className='font-poppins flex justify-center items-center py-10 min-h-screen w-full'>
      <div className="bg-white min-w-[500px] min-h-[550px] rounded-md p-12 flex justify-start items-center flex-col">
        <div className="text-start w-full">
          <h1 className='font-[600] text-[28px] text-primary'>Sign up</h1>
          <p className='font-[500] pt-1 text-[16px]'>Please Input Your Personal Data</p>
          <p className='text-[14px] pt-1 font-[500]'>Have an account? 
            <Link href='/'> 
              <span className='text-primary underline italic'> Login here</span>
            </Link>
          </p>
        </div>
        <div className="flex gap-24">
            <div className="">
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
                    <label className='font-[500] text-[16px]'>Name:</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Name'
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
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Email:</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Email'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Phone:</label>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Phone'
                    />
                  </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-col gap-6 justify-center mt-10">
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>No KTP:</label>
                    <input 
                      type="number" 
                      value={no_ktp}
                      onChange={(e) => setKTP(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your no. KTP'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Date of Birth:</label>
                    <input 
                      type="date" 
                      value={date_of_birth}
                      onChange={(e) => setDate(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Date of Birth'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Description:</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDesc(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[150px] rounded-sm p-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Description'
                    />
                  </div>
                </div>
                <div className="mt-14 gap-4 flex justify-center flex-col items-center">
                  <button onClick={handleRegister} className='bg-primary text-white font-[500] text-[16px] w-[350px] cursor-pointer py-3 duration-200 rounded-md hover:bg-transparent hover:text-primary border-3 border-primary'>Register</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}