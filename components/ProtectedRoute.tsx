'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { token } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token !== null) {
            setIsLoading(false);
        } else {
            router.push('/login');
        }
    }, [token, router]);

    if (isLoading) return <p>Loading...</p>;

    return <>{children}</>;
};
