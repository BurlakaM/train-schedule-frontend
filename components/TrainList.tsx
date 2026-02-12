import { TrainItem } from './TrainItem';
import { TrainResponse } from '@/types';
import {useAuth} from "@/context/AuthContext";

interface TrainListProps {
    trains: TrainResponse[];
    showActions?: boolean;
}

export const TrainList = ({ trains }: TrainListProps) => {
    const { token, isLoading } = useAuth();

    if (isLoading || !token) {

    }
    return (
        <div className="overflow-x-auto text-green-300 px-10 bg-black md:min-h-100 sm:min-h-auto">
            <table className="w-full table-auto border-separate border-spacing-y-2">
                <thead>
                <tr className="text-green-300 border-b border-green-700 font-mono uppercase">
                    <th className="px-4 py-2 text-left">Number</th>
                    <th className="px-4 py-2 text-left">Departure</th>
                    <th className="px-4 py-2 text-left">Arrival</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Owner</th>
                </tr>
                </thead>
                <tbody>
                {trains.map(train => (
                    <TrainItem key={train.id} train={train} />
                ))}
                </tbody>
            </table>
        </div>
    );
};
