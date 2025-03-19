"use client"
import NavbarAdmin from "@/components/NavbarAdmin"
import PenaltiesPage from "@/components/PenaltiesPage"
import RentPage from "@/components/RentPage"
import ReturnPage from "@/components/ReturnPage"
import UserPage from "@/components/UserPage"

export default function Home() {
    return (
        <div className="pb-16">
            <NavbarAdmin/>
            <div className="pt-32 flex flex-col gap-10">
                <UserPage/>
                <RentPage/>
                <PenaltiesPage/>
                <ReturnPage/>
            </div>
        </div>
    )
}