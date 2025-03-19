'use client'
import NavbarUser from "@/components/NavbarUser"
import PenaltiesUserPage from "@/components/user/PenaltiesUserPage"
import RentUserPage from "@/components/user/RentUserPage"
import ReturnUserPage from "@/components/user/ReturnUserPage"

export default function Home() {
    return (
        <div className="pb-16">
            <NavbarUser/>
            <div className="pt-32 flex flex-col gap-10">
                <RentUserPage/>
                <PenaltiesUserPage/>
                <ReturnUserPage/>
            </div>
        </div>
    )
}