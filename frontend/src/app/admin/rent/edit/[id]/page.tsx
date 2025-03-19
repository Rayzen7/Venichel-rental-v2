/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { getErrorMessage } from '@/utils/getErrorMessage'
import Swal from 'sweetalert2'

export default function AddRent() {
  interface User {
      id: number;
      user: string;
      no_ktp: number;
      name: string;
      email: string;
      date_of_birth: string;
      phone: number;
      description: string
  }

  const [tenant, setTenant] = useState('');
  const [no_car, setCar] = useState('');
  const [date_borrow, setDateBorrow] = useState('');
  const [date_return, setDateReturn] = useState('');
  const [down_payment, setDownPayment] = useState<any>('');
  const [discount, setDiscount] = useState<any>('');
  const [total, setTotal] = useState<any>('');
  const [user, setUser] = useState<User[]>([]);
  const navigate = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async() => {
        try {
            const token = await axios.get('/service/token');
            const response = await axios.get(`http://localhost:8000/api/a1/register?token=${token.data.token}`);

            setUser(response.data.user);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchId = async() => {
        try {
            const token = await axios.get('/service/token');
            const response = await axios.get(`http://localhost:8000/api/a1/rent/${id}?token=${token.data.token}`);

            const getById = response.data.rent;
            setCar(getById.no_car);
            setDateBorrow(getById.date_borrow);
            setDateReturn(getById.date_return);
            setDownPayment(getById.down_payment);
            setDiscount(getById.discount);
            setTotal(getById.total);
        } catch (error) {
            console.error(error);
        }
    }

    setTotal(down_payment - discount);
    fetchItem();
    fetchId();
  }, [down_payment, discount, id]);
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await axios.get('/service/token');
      const response = await axios.put(`http://localhost:8000/api/a1/rent/${id}?token=${token.data.token}`, {
        tenant,
        no_car,
        date_borrow,
        date_return,
        down_payment,
        discount,
        total
      });

      Swal.fire({
        title: response.data.message,
        text: 'You can be redirect to Admin Dashboard',
        icon: 'success',
        confirmButtonText: 'Success',
        confirmButtonColor: '#16A34A'
      }).then((success) => {
        if (success.isConfirmed) {
            navigate.push('/admin/home');
        }
      });

      setTimeout(() => {
        navigate.push('/admin/home');
      }, 3000);

    } catch (error: unknown) {
        Swal.fire({
            title: getErrorMessage(error),
            text: 'There is Wrong',
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
            <Link href='/admin/home'>
                <div className="flex justify-start group items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-9 h-9 group-hover:fill-primary group-hover:rotate-[110deg] group-hover:bg-white border-3 duration-200 border-primary rounded-full rotate-90 fill-white bg-primary p-1' viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/></svg>
                  <h1 className='font-[600] text-[28px] text-primary'>Add Rent</h1>    
                </div>
            </Link>
        </div>
        <div className="flex gap-24">
            <div className="">
                <div className="flex flex-col gap-6 justify-center mt-10">
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Tenant:</label>
                    <select name="" className='border-3 p-3 rounded-md' value={tenant} onChange={(e) => setTenant(e.target.value)}>
                        <option value='' disabled>Select Item</option>
                        {user.length > 0 ? (
                            user.map((users) => (
                                <option value={users.id} key={users.id}>{users.name}</option>
                            ))
                        ) : (
                            <option disabled>Data Not Found</option>
                        )}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>No Car:</label>
                    <input 
                      type="text" 
                      value={no_car}
                      onChange={(e) => setCar(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your No Car'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Date Borrow:</label>
                    <input 
                      type="date" 
                      value={date_borrow}
                      onChange={(e) => setDateBorrow(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Date Borrow'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Date Return:</label>
                    <input 
                      type="date" 
                      value={date_return}
                      onChange={(e) => setDateReturn(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Date Return'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Down Payment:</label>
                    <input 
                      type="number" 
                      value={down_payment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Down Payment'
                    />
                  </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-col gap-6 justify-center mt-10">
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Discount:</label>
                    <input 
                      type="number" 
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Discount'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Total:</label>
                    <input 
                      type='number'
                      value={total}
                      disabled
                      onChange={(e) => setTotal(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Total'
                    />
                  </div>
                </div>
                <div className="mt-14 gap-4 flex justify-center flex-col items-center">
                  <button onClick={handleSubmit} className='bg-primary text-white font-[500] text-[16px] w-[350px] cursor-pointer py-3 duration-200 rounded-md hover:bg-transparent hover:text-primary border-3 border-primary'>Update Rent</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}