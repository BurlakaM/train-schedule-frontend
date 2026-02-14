'use client';

import { useEffect, useState } from 'react';
import { TrainItem } from './TrainItem';
import { TrainResponse } from '@/types';
import { api } from '@/lib/api';

interface TrainListResponse {
    data: TrainResponse[];
    total: number;
    page: number;
    lastPage: number;
}

export const TrainList = () => {
    const [trains, setTrains] = useState<TrainResponse[]>([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const limit = 10;

    const fetchTrains = async () => {
        setLoading(true);
        try {
            const res = await api.get<TrainListResponse>('/trains', {
                params: { search, sort, order, page, limit },
            });

            setTrains(res.data.data);
            setLastPage(res.data.lastPage);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrains();
    }, [search, sort, order, page]);

    const handleSort = (field: string) => {
        if (sort === field) {
            setOrder(order === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSort(field);
            setOrder('ASC');
        }
    };

    return (
        <div className="px-10 bg-black text-green-300 min-h-[600px]">

            {/* Search */}
            <div className="flex justify-between items-center my-4">
                <input
                    type="text"
                    placeholder="Search trains..."
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    className="px-4 py-2 bg-gray-900 border border-green-700 rounded text-green-300 mt-4"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-separate border-spacing-y-2">
                    <thead>
                    <tr className="border-b border-green-700 font-mono uppercase">
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('number')}>
                            Number
                        </th>
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('departure')}>
                            Departure
                        </th>
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('arrival')}>
                            Arrival
                        </th>
                        <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort('time')}>
                            Time
                        </th>
                        <th className="px-4 py-2 text-left">Owner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="text-center py-6">
                                Loading...
                            </td>
                        </tr>
                    ) : trains.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-6">
                                No trains found
                            </td>
                        </tr>
                    ) : (
                        trains.map(train => (
                            <TrainItem key={train.id} train={train} />
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(prev => prev - 1)}
                    className="px-4 py-2 bg-green-700 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="font-mono">
                    Page {page} of {lastPage}
                </span>

                <button
                    disabled={page === lastPage}
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-4 py-2 bg-green-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
