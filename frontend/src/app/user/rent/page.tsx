'use client'

import NavbarUser from "@/components/NavbarUser"
import RentUserPage from "@/components/user/RentUserPage"

export default function RentPage () {
    return (
        <div className="pb-16">
            <NavbarUser/>
            <div className="pt-32 flex flex-col gap-10">
                <RentUserPage/>
            </div>
        </div>
    )
}