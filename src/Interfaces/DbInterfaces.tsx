import { Location } from './MapInterfaces';
export interface Local {
    id: number,
    name: string,
    location: Location,
    adress: string,
    uriImage: string,
    isVerify: boolean,
    schedules: Schedule[],
    rate: number,
    quantityRate: number,
    tags: string[]
}

export interface Schedule {
    day1: string,
    day2: string,
    open: string,
    close: string,
}

interface User {
    id: string,
    nombre: string
}