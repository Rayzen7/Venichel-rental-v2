'use client'

import NavbarUser from "@/components/NavbarUser"
import PenaltiesUserPage from "@/components/user/PenaltiesUserPage"

export default function PenaltiesPage () {
    return (
        <div className="pb-16">
            <NavbarUser/>
            <div className="pt-32 flex flex-col gap-10">
                <PenaltiesUserPage/>
            </div>
        </div>
    )
}