'use client'
import { useEffect, useState } from "react"
import MagicButton from "@/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { getErrorMessage } from "@/utils/getErrorMessage"

export default function UserPage() {
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

    const [item, setItem] = useState<User[]>([]);
    const navigate = useRouter();

    useEffect(() => {
        const fetchItem = async() => {
            const token = await axios.get('/service/token');
            const response = await axios.get(`http://localhost:8000/api/a1/register?token=${token.data.token}`);
            setItem(response.data.user);
        }

        fetchItem();
    }, []);

    const handleEdit = async(id: number) => {
        navigate.push(`/admin/home/edit/${id}`)
    }

    const handleDelete = async(id: number) => {
        try {
            const token = await axios.get('/service/token');
            const response = await axios.delete(`http://localhost:8000/api/a1/register/${id}?token=${token.data.token}`)

            Swal.fire({
                title: response.data.message,
                text: 'You can reload this page',
                icon: 'success',
                confirmButtonColor: '#94084c',
                confirmButtonText: 'Oke'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });

            setTimeout(() => {
                navigate.push('/');
              }, 3000);

        } catch (error) {
            Swal.fire({
                title: getErrorMessage(error),
                text: 'There is wrong',
                icon: 'error',
                confirmButtonColor: '#94084c',
                confirmButtonText: 'Oke'
            });
        }
    }

    return (
        <div className="">
            <div className="bg-white w-[90%] min-h-[50vh] mx-auto rounded-md p-12 font-poppins">
                <div className="flex justify-between items-center px-10">
                    <h1 className="font-[600] text-[36px]">All <span className="text-primary">User</span></h1>
                </div>
                <div className="mt-16">
                    {item.length > 0 ? (
                        <table className="border-collapse font-[500] mx-auto">
                            <thead>
                                <tr>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">No</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Tenant</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">No KTP</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Email</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Date of Birth</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Phone</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Description</td>
                                    <td className="text-[18px] border-b-3 px-6 pb-3 border-black">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {item.map((items, index) => (
                                    <tr key={index}>
                                        <td className="text-[16px] text-center py-6 px-6 pb-3 border-black">{index + 1}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.name}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.no_ktp}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.email}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.date_of_birth}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.phone}</td>
                                        <td className="text-[16px] py-6 px-6 pb-3 border-black">{items.description}</td>
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