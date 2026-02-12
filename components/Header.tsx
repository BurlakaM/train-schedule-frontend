'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export const Header = () => {
    const { token, logout } = useAuth();

    return (
        <header className="text-green-600 px-6 py-4 flex items-center justify-between shadow-md">
            <div className="text-xl font-bold">
                <Link href="/" className="hover:text-green-400 transition-colors">
                    Home
                </Link>
            </div>

            <nav className="flex items-center space-x-4">
                {!token && (
                    <>
                        <Link href="/login" className="px-3 py-1 border border-green-400 rounded hover:bg-green-400 hover:text-black transition">
                            Login
                        </Link>
                        <Link href="/register" className="px-3 py-1 border border-green-400 rounded hover:bg-green-400 hover:text-black transition">
                            Register
                        </Link>
                    </>
                )}
                {token && (
                    <>
                        <Link href="/trains/create" className="px-3 py-1 border border-green-400 rounded hover:bg-green-400 hover:text-black transition">
                            Create Train
                        </Link>
                        <button
                            onClick={logout}
                            className="px-3 py-1 border border-green-400 rounded hover:bg-green-400 hover:text-black transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};
