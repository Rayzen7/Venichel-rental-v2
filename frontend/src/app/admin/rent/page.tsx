'use client'
import NavbarAdmin from "@/components/NavbarAdmin"
import RentPage from "@/components/RentPage"

export default function Rent() {
    return (
        <div className="">
            <NavbarAdmin/>
            <div className="pt-32">
                <RentPage/>
            </div>
        </div>
    )
}