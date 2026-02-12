'use client';

import {useRouter} from 'next/navigation';
import {TrainForm} from '@/components/TrainForm';
import {TrainResponse} from '@/types';
import {ProtectedRoute} from "@/components/ProtectedRoute";
import MainLayout from "@/app/MainLayout";

export default function CreateTrainPage() {
    const router = useRouter();
    const handleSuccess = (newTrain: TrainResponse) => {
        router.push(`/trains/${newTrain.id}`);
    };

    return (
        <>
            <ProtectedRoute>
                <MainLayout title="Create Train">
                    <TrainForm onSuccess={handleSuccess} type={'create'}/>
                </MainLayout>
            </ProtectedRoute>
        </>
    );
}
