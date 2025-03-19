"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthCookies() {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useRouter();

    useEffect(() => {
        const fetchToken = async() => {
            try {
                const tokenStore = await axios.get('/service/token');
                setToken(tokenStore.data?.token);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchToken();
    }, []);

    useEffect(() => {
        if (!token && loading == false) {
            navigate.push('/');
        }
    }, [token, loading, navigate]);

    return null;
}