"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { getErrorMessage } from '@/utils/getErrorMessage'
import Swal from 'sweetalert2'

export default function EditPenalties() {
    interface User {
        id: number;
        tenant: number;
        no_car: number;
        date_borrow: number;
        date_return: number;
        down_payment: number;
        discount: number;
        total: number;
    }

  const [no_car, setCar] = useState('');
  const [penalties_name, setPenaltiesName] = useState('');
  const [description, setDesc] = useState('');
  const [penalties_total, setPenaltiesTotal] = useState('');
  const [rent, setRent] = useState<User[]>([]);
  const navigate = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async() => {
        try {
            const token = await axios.get('/service/token');            
            const response = await axios.get(`http://localhost:8000/api/a1/rent?token=${token.data.token}`);

            setRent(response.data.rent);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchId = async() => {
        try {
            const token = await axios.get('/service/token');            
            const response = await axios.get(`http://localhost:8000/api/a1/penalties/${id}?token=${token.data.token}`)

            const getById = response.data.penalties;
            setPenaltiesName(getById.penalties_name);
            setDesc(getById.description);
            setPenaltiesTotal(getById.penalties_total);
        } catch (error) {
            console.error(error);
        }
    }

    fetchItem();
    fetchId();
  }, [id]);
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await axios.get('/service/token');
      const response = await axios.put(`http://localhost:8000/api/a1/penalties/${id}?token=${token.data.token}`, {
        no_car,
        penalties_name,
        penalties_total,
        description
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
                  <h1 className='font-[600] text-[28px] text-primary'>Edit Penalties</h1>    
                </div>
            </Link>
        </div>
        <div className="flex gap-24">
            <div className="">
                <div className="flex flex-col gap-6 justify-center mt-10">
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>No Car:</label>
                    <select name="" className='border-3 p-3 rounded-md' value={no_car} onChange={(e) => setCar(e.target.value)}>
                        <option value='' disabled>Select Item</option>
                        {rent.length > 0 ? (
                            rent.map((rents) => (
                                <option value={rents.id} key={rents.id}>{rents.no_car} | {rents.tenant}</option>
                            ))
                        ) : (
                            <option disabled>Data Not Found</option>
                        )}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Penalties Name:</label>
                    <input 
                      type="text" 
                      value={penalties_name}
                      onChange={(e) => setPenaltiesName(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Penalties Name'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className='font-[500] text-[16px]'>Penalties Total:</label>
                    <input 
                      type="text" 
                      value={penalties_total}
                      onChange={(e) => setPenaltiesTotal(e.target.value)}
                      className='w-[350px] text-[14px] outline-none border-3 h-[50px] rounded-sm px-3 font-[400] focus-within:border-primary'
                      placeholder='Enter Your Penalties Total'
                    />
                  </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-col gap-6 justify-center mt-10">
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
                  <button onClick={handleSubmit} className='bg-primary text-white font-[500] text-[16px] w-[350px] cursor-pointer py-3 duration-200 rounded-md hover:bg-transparent hover:text-primary border-3 border-primary'>Update Penalties</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}