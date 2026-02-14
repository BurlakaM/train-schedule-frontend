'use client';

import { TrainList } from '@/components/TrainList';
import MainLayout from "@/app/MainLayout";

export default function HomePage() {
    return (
        <>
            <MainLayout title="Train Schedule">
                <TrainList />
            </MainLayout>
        </>
    );
}
