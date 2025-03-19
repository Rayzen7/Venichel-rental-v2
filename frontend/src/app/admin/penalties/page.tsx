'use client'

import NavbarAdmin from "@/components/NavbarAdmin"
import PenaltiesPage from "@/components/PenaltiesPage"

export default function Penalties() {
    return (
        <div className="">
            <NavbarAdmin/>
            <div className="pt-32">
                <PenaltiesPage/>
            </div>
        </div>
    )
}