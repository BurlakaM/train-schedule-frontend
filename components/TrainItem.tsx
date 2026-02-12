import {TrainResponse} from '@/types';
import {useAuth} from "@/context/AuthContext";
import {api} from "@/lib/api";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useEffect} from "react";

interface TrainItemProps {
    train: TrainResponse;
    showActions?: boolean;
}

export const TrainItem = ({train}: TrainItemProps) => {
    const router = useRouter();
    const {user} = useAuth();
    const isOwner = user?.id === train.user.id;
    const handleRowClick = () => {
        router.push(`/trains/${train.id}`);
    };

    return (
        <tr className="hover:bg-green-900 transition-colors cursor-default font-mono text-green-500 uppercase" onClick={handleRowClick}>
            <td className="px-4 py-2">{train.number}</td>
            <td className="px-4 py-2">{train.departure}</td>
            <td className="px-4 py-2">{train.arrival}</td>
            <td className="px-4 py-2">
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
            </td>

            <td className="px-4 py-2 text-green-400">{train.user.name}</td>
        </tr>
    );
};
