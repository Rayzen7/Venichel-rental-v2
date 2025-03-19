/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react"
import MagicButton from "@/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Link from "next/link"
import { getErrorMessage } from "@/utils/getErrorMessage"

export default function ReturnPage() {
    interface User {
        id: number;
        tenant: number;
        no_car: number;
        id_penalties: any;
        date_borrow: number;
        date_return: number;
        discount: number;
        total: number;
        penalties_name: string;
    }

    const [item, setItem] = useState<User[]>([]);
    const navigate = useRouter();

    useEffect(() => {
        const fetchItem = async() => {
            const token = await axios.get('/service/token');
            const response = await axios.get(`http://localhost:8000/api/a1/return?token=${token.data.token}`);
            setItem(response.data.return);
        }

        fetchItem();
    }, []);

    const handleEdit = async(id: number) => {
        navigate.push(`/admin/return/edit/${id}`)
    }

    const handleDelete = async(id: number) => {
        try {
            const token = await axios.get('/service/token');
            const response = await axios.delete(`http://localhost:8000/api/a1/return/${id}?token=${token.data.token}`)

            Swal.fire({
                title: response.data.message,
                text: 'You can reload this page',
                icon: 'success',
                confirmButtonColor: '#16A34A',
                confirmButtonText: 'Oke'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });

            setTimeout(() => {
                navigate.push('/admin/home');
              }, 3000);

        } catch (error) {
            Swal.fire({
                title: getErrorMessage(error),
                text: 'There is wrong',
                icon: 'error',
                confirmButtonColor: '#DC2626',
                confirmButtonText: 'Oke'
            });
        }
    }

    return (
        <div className="">
            <div className="bg-white w-[90%] min-h-[50vh] mx-auto rounded-md p-12 font-poppins">
                <div className="flex justify-between items-center px-10">
                    <h1 className="font-[600] text-[36px]">All <span className="text-primary">Return User</span></h1>
                    <Link href='/admin/return/add'>
                        <MagicButton
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/></svg>}
                            onClick={() => ''}
                            color="green"
                            padding={12}
                        />
                    </Link>
                </div>
                <div className="mt-16">
                    {item.length > 0 ? (
                        <table className="border-collapse font-[500] mx-auto">
                            <thead>
                                <tr>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">No</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Tenant</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">No Car</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Penalties Name</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Date Borrow</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Date Return</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Discount</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Total</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {item.map((items, index) => (
                                    <tr key={index}>
                                        <td className="text-[16px] text-center py-6 px-6 pb-3 border-black">{index + 1}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.tenant}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.no_car}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.id_penalties?.penalties_name ?? 'None'}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.date_borrow}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.date_return}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">Rp. {items.discount}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">Rp. {items.total}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 flex justify-center items-center gap-2 border-black">
                                            <MagicButton
                                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/></svg>}
                                                color="blue"
                                                padding={8}
                                                onClick={() => handleEdit(items.id)}
                                            />
                                            <MagicButton
                                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-4 9H8v-2h8v2z"/></svg>}
                                                color="red"
                                                padding={8}
                                                onClick={() => handleDelete(items.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="font-poppins font-[500] text-gray-500 text-center text-[20px] mx-auto">Data Not Found</p>
                    )}
                </div>
            </div>            
        </div>
    )
}