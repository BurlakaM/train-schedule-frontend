export interface UserResponse {
    id: number;
    name: string;
    email: string;
}

export interface TrainResponse {
    id: number;
    number: string;
    departure: string;
    arrival: string;
    time: string;
    user: UserResponse;
}
