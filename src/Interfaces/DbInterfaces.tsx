import { Location } from './MapInterfaces';
export interface Local {
    id: number,
    name: string,
    location: Location,
    description: string,
    address: string,
    uriImage: string,
    isVerify: boolean,
    schedules: Schedule[],
    rate: number,
    quantityRate: number,
    tags: string[],
    lat: string,
    long: string,
}

export interface Schedule {
    day1: string,
    day2: string,
    open: string,
    close: string,
}

interface User {
    id: string,
    name: string
}

export interface Contact {
    name: string;
    data: string;
}