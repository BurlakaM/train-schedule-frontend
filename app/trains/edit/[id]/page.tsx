'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import MainLayout from '@/app/MainLayout';
import { TrainForm } from '@/components/TrainForm';
import { TrainResponse } from '@/types';

export default function EditTrainPage() {
    const params = useParams();
    const trainId = params.id;
    const { user } = useAuth();
    const router = useRouter();

    const [train, setTrain] = useState<TrainResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!trainId || !user) return;

        setLoading(true);
        api.get(`/trains/${trainId}`)
            .then(res => {
                const fetchedTrain: TrainResponse = res.data;

                if (fetchedTrain.user.id !== user.id) {
                    alert('You are not allowed to edit this train.');
                    router.push('/');
                    return;
                }

                setTrain(fetchedTrain);
            })
            .catch(() => {
                alert('Failed to load train');
                router.push('/');
            })
            .finally(() => setLoading(false));
    }, [trainId, user, router]);

    const handleSuccess = (updatedTrain: TrainResponse) => {
        router.push(`/trains/${trainId}`);
    };

    const handleCancel = () => {
        router.push(`/trains/${trainId}`);
    };

    if (loading) return <MainLayout><p>Loading train...</p></MainLayout>;
    if (!train) return <MainLayout><p>Train not found</p></MainLayout>;

    return (
        <ProtectedRoute>
            <MainLayout>
                    <TrainForm
                        train={train}
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                        type={'edit'}
                    />
            </MainLayout>
        </ProtectedRoute>
    );
}
