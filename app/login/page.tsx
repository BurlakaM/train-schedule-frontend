'use client';

import {useState, useEffect} from 'react';
import {useAuth} from '@/context/AuthContext';
import {api} from '@/lib/api';
import {useRouter} from 'next/navigation';
import MainLayout from "@/app/MainLayout";

export default function LoginPage() {
    const { token, login, isLoading } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isLoading && token) {
            router.push('/');
        }
    }, [token, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.access_token, res.data.user);
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <MainLayout title="Login">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h1>

                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
                >
                    Login
                </button>
            </form>
        </MainLayout>
    );
}
