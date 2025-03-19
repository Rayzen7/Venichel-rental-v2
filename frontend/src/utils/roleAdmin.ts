"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function RoleAdmin() {
    const [userRole, setUserRole] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useRouter();

    useEffect(() => {
        const fetchRole = async() => {
            try {
                const token = await axios.get('/service/token');
                const response = await axios.get(`http://localhost:8000/api/a1/getuser?token=${token.data.token}`);

                setUserRole(response.data.user.role_id);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchRole();
    }, []);
    
    useEffect(() => {
        if (loading == false) {
            if (userRole != 1) {
                navigate.push('/');
            } else {
                return;
            }
        }

    }, [loading, navigate, userRole]);

    return null;
}