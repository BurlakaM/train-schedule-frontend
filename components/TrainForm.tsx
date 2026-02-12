'use client';

import { useState } from 'react';
import { TrainResponse } from '@/types';
import { api } from '@/lib/api';

interface Props {
    train?: TrainResponse;
    onSuccess?: (updatedTrain: TrainResponse) => void;
    onCancel?: () => void;
    type?: 'create' | 'edit';
}

export const TrainForm = ({ train, onSuccess, onCancel, type }: Props) => {
    const [number, setNumber] = useState(train?.number || '');
    const [departure, setDeparture] = useState(train?.departure || '');
    const [arrival, setArrival] = useState(train?.arrival || '');
    const [time, setTime] = useState(train?.time || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let res;
            if (train) {
                res = await api.put(`/trains/${train.id}`, { number, departure, arrival, time });
            } else {
                res = await api.post('/trains', { number, departure, arrival, time });
            }
            onSuccess?.(res.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto"
        >
            <h1 className="text-2xl font-bold mb-6 text-center text-green-700">{type === 'create' ? 'Create Train' : 'Edit Train'}</h1>

            {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            <div className="mb-4">
                <label className="block mb-1 font-medium">Train Number:</label>
                <input
                    type="text"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Departure:</label>
                <input
                    type="text"
                    value={departure}
                    onChange={e => setDeparture(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Arrival:</label>
                <input
                    type="text"
                    value={arrival}
                    onChange={e => setArrival(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1 font-medium">Time:</label>
                <input
                    type="datetime-local"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
            >
                { type === 'create' ? 'Create' : 'Update' }
            </button>
        </form>
    );
};
