/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react"
import axios from "axios"

export default function PenaltiesUserPage() {
    interface Penalties {
        id: number;
        penalties_name: string;
        description: string;
        no_car: number;
        penalties_total: number;
        penalties: any;
        rent: any;
    }

    const [item, setItem] = useState<Penalties[]>([]);

    useEffect(() => {
        const fetchItem = async() => {
            const token = await axios.get('/service/token');
            const response = await axios.get(`http://localhost:8000/api/a1/datauser?token=${token.data.token}`);
            setItem(response.data.datauser[0].penalties);
        }

        fetchItem();
    }, []);  

    return (
        <div className="">
            <div className="bg-white w-[90%] min-h-[50vh] mx-auto rounded-md p-12 font-poppins">
                <div className="flex justify-between items-center px-10">
                    <h1 className="font-[600] text-[36px]">All <span className="text-primary">Penalties User</span></h1>
                </div>
                <div className="mt-16">
                    {item.length > 0 ? (
                        <table className="border-collapse font-[500] mx-auto">
                            <thead>
                                <tr>
                                    <td className="text-[18px] border-b-3 px-13 pb-3 border-black">No</td>
                                    <td className="text-[18px] border-b-3 px-13 pb-3 border-black">Penalties Name</td>
                                    <td className="text-[18px] border-b-3 px-13 pb-3 border-black">Description</td>
                                    <td className="text-[18px] border-b-3 px-13 pb-3 border-black">No Car</td>
                                    <td className="text-[18px] border-b-3 px-13 pb-3 border-black">Penalties Total</td>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {item.map((items, index) => (
                                    <tr key={index}>
                                        <td className="text-[16px] text-center py-6 px-13 pb-3 border-black">{index + 1}</td>
                                        <td className="text-[16px] py-6 px-13 pb-3 border-black">{items.penalties_name}</td>
                                        <td className="text-[16px] py-6 px-13 pb-3 border-black">{items.description}</td>
                                        <td className="text-[16px] py-6 px-13 pb-3 border-black">{items.no_car}</td>
                                        <td className="text-[16px] py-6 px-13 pb-3 border-black">Rp. {items.penalties_total}</td>
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