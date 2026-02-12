'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TrainResponse } from '@/types';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import MainLayout from '@/app/MainLayout';

export default function TrainPage() {
    const params = useParams();
    const trainId = params.id;
    const { token, user } = useAuth();
    const router = useRouter();

    const [train, setTrain] = useState<TrainResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        api.get(`/trains/${trainId}`)
            .then(res => setTrain(res.data))
            .finally(() => setLoading(false));
    }, [trainId]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this train?')) return;
        setDeleting(true);
        try {
            await api.delete(`/trains/${trainId}`);
            router.push('/');
        } catch (err) {
            alert('Failed to delete train');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <MainLayout><p>Loading...</p></MainLayout>;
    if (!train) return <MainLayout><p>Train not found</p></MainLayout>;

    const isOwner = token && user?.id === train.user.id;

    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="max-w-xl mx-auto bg-green-900/10 p-6 rounded shadow-md">
                    <h1 className="text-3xl font-bold mb-4 tracking-wide">Train {train.number}</h1>
                    <div className="space-y-2 text-green-400 font-mono">
                        <p><span className="font-bold">From:</span> {train.departure}</p>
                        <p><span className="font-bold">To:</span> {train.arrival}</p>
                        <p>
                            <span className="font-bold">Time:</span>{' '}
                            {train.time
                                ? new Date(train.time).toLocaleString('uk-UA', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })
                                : '-'}
                        </p>
                        <p>
                            <span className="font-bold">Owner:</span> {train.user.name} ({train.user.email})
                        </p>
                    </div>

                    {isOwner && (
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => router.push(`/trains/edit/${train.id}`)}
                                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition disabled:opacity-50"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
