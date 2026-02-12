'use client';

import { useEffect, useState } from 'react';
import { TrainList } from '@/components/TrainList';
import { TrainResponse } from '@/types';
import { api } from '@/lib/api';
import MainLayout from "@/app/MainLayout";

export default function HomePage() {
    const [trains, setTrains] = useState<TrainResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/trains')
            .then(res => setTrains(res.data.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <MainLayout title="Train Schedule">
                {loading ? (
                    <p className="text-center text-green-400 font-mono">Loading...</p>
                ) : (
                    <TrainList trains={trains} />
                )}
            </MainLayout>
        </>
    );
}
