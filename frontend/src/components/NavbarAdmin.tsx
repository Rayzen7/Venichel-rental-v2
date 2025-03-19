'use client'
import AuthCookies from "@/utils/authCookies"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { getErrorMessage } from "@/utils/getErrorMessage"
import RoleAdmin from "@/utils/roleAdmin"

export default function NavbarAdmin() {
    const pathname = usePathname();
    const navigate = useRouter();
    const [user, setUser] = useState<{ name: string }>({ name: '' });
    const [open, setOpen] = useState(false);

    AuthCookies();
    RoleAdmin();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const token = await axios.get('/service/token');
                const response = await axios.get(`http://localhost:8000/api/a1/getuser?token=${token.data.token}`);

                setUser(response.data.user);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUser();
    }, []);

    const handleLogout = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await axios.get('/service/token');
            const response = await axios.get('http://localhost:8000/api/a1/auth/logout', {
                headers: {
                    Authorization: `Bearer ${token.data.token}`
                }
            });

            await axios.delete('/service/del-token');
            toast.success(response.data.message, {
                'autoClose': 2000,
                'theme': 'colored'
            });

            setTimeout(() => {
                navigate.push('/');
            }, 3000);

        } catch (error) {
            toast.error(getErrorMessage(error), {
                'autoClose': 2000,
                'theme': 'colored'
            });
        }
    }

    return (
        <div className="">
            <div className="font-poppins flex justify-between fixed items-center w-full h-[11vh] px-[70px] bg-white">
            <h1 className="text-[24px] font-[600]"><span className="text-primary">Vanichel</span> Rental</h1>
                <div className="flex justify-center items-center gap-12 font-[500] text-[18px]">
                    <Link href='/admin/home'>
                        <p className={`hover:text-primary cursor-pointer duration-200 ${pathname == '/admin/home' ? 'text-primary' : ''}`}>Home</p>
                    </Link>
                    <Link href='/admin/rent'>
                        <p className={`hover:text-primary cursor-pointer duration-200 ${pathname == '/admin/rent' ? 'text-primary' : ''}`}>Rent</p>
                    </Link>
                    <Link href='/admin/penalties'>
                        <p className={`hover:text-primary cursor-pointer duration-200 ${pathname == '/admin/penalties' ? 'text-primary' : ''}`}>Penalties</p>
                    </Link>
                    <Link href='/admin/return'>
                        <p className={`hover:text-primary cursor-pointer duration-200 ${pathname == '/admin/return' ? 'text-primary' : ''}`}>Return</p>
                    </Link>
                    <div className="relative">
                        <div className="flex relative z-20 justify-center items-center gap-3 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 group-hover:fill-primary duration-200" viewBox="0 0 24 24"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"/></svg>
                            <p className="font-[500] text-[16px] cursor-pointer group-hover:text-primary">{user?.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setOpen(!open)} className={`w-7 h-7 cursor-pointer group-hover:fill-primary duration-200 ${open == true ? 'rotate-180' : ""}`} viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/></svg>
                        </div>
                        <div className={`h-0 overflow-hidden duration-150 ml-12 w-[120px] flex justify-center items-end rounded-b-md mt-12 bg-white inset-0 absolute ${open == true ? 'h-[60px]' : ''}`}>
                            <button onClick={handleLogout} className="font-[600] bg-transparent hover:bg-[#f0f0f0] px-8 py-4 rounded-b-md text-[16px] cursor-pointer hover:text-primary duration-200">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}