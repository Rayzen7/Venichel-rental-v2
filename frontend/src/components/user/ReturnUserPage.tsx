/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react"
import axios from "axios"

export default function ReturnUserPage() {
    interface User {
        id: number;
        tenant: number;
        no_car: number;
        id_penalties: any;
        date_borrow: number;
        date_return: number;
        discount: number;
        total: number;
        name: string;
        penalties_name: string;
        penalties: any;
        rent: any;
        return: any;
    }

    const [item, setItem] = useState<User[]>([]);

    useEffect(() => {
        const fetchItem = async() => {
            const token = await axios.get('/service/token');
            const response = await axios.get(`http://localhost:8000/api/a1/datauser?token=${token.data.token}`);
            setItem(response.data.datauser[0].return);
        }

        fetchItem();
    }, []);

    return (
        <div className="">
            <div className="bg-white w-[90%] min-h-[50vh] mx-auto rounded-md p-12 font-poppins">
                <div className="flex justify-between items-center px-10">
                    <h1 className="font-[600] text-[36px]">All <span className="text-primary">Return User</span></h1>
                </div>
                <div className="mt-16">
                    {item.length > 0 ? (
                        <table className="border-collapse font-[500] mx-auto">
                            <thead>
                                <tr>
                                    <td className="text-[18px] border-b-3 px-9 pb-3 border-black">No</td>
                                    <td className="text-[18px] border-b-3 px-9 pb-3 border-black">No Car</td>
                                    <td className="text-[18px] border-b-3 px-9 pb-3 border-black">Penalties Name</td>
                                    <td className="text-[18px] border-b-3 px-9 pb-3 border-black">Date Borrow</td>
                                    <td className="text-[18px] border-b-3 px-9 pb-3 border-black">Date Return</td>
                                    <td className="text-[18px] border-b-3 px-9 pb-3 border-black">Discount</td>
                                    <td className="text-[18px] border-b-3 px-9 pb-3 border-black">Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {item.map((items, index) => (
                                    <tr key={index}>
                                        <td className="text-[16px] text-center py-6 px-9 pb-3 border-black">{index + 1}</td>
                                        <td className="text-[16px] py-6 px-9 pb-3 border-black">{items.no_car}</td>
                                        <td className="text-[16px] py-6 px-9 pb-3 border-black">{items.penalties_name ?? 'None'}</td>
                                        <td className="text-[16px] py-6 px-9 pb-3 border-black">{items.date_borrow}</td>
                                        <td className="text-[16px] py-6 px-9 pb-3 border-black">{items.date_return}</td>
                                        <td className="text-[16px] py-6 px-9 pb-3 border-black">Rp. {items.discount}</td>
                                        <td className="text-[16px] py-6 px-9 pb-3 border-black">Rp. {items.total}</td>    
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