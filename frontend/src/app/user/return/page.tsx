'use client'

import NavbarUser from "@/components/NavbarUser"
import ReturnUserPage from "@/components/user/ReturnUserPage"

export default function ReturnPage () {
    return (
        <div className="pb-16">
            <NavbarUser/>
            <div className="pt-32 flex flex-col gap-10">
                <ReturnUserPage/>
            </div>
        </div>
    )
}