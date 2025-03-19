'use client'
import NavbarAdmin from "@/components/NavbarAdmin"
import ReturnPage from "@/components/ReturnPage"

export default function Return() {
    return (
        <div className="">
            <NavbarAdmin/>
            <div className="pt-32">
                <ReturnPage/>
            </div>
        </div>
    )
}