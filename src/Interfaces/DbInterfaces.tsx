import { Location } from './MapInterfaces';
export interface Local {
    _id: number,
    name: string,
    description: string,
    address: string,
    uriImage: string,
    isVerify: boolean,
    country: string,
    state: string,
    town: string,
    postalCode: string,
    contact: {},
    schedules: Schedule[],
    rate: number,
    quantityRate: number,
    tags: string[],
    location: Location,
    open: string
}

export interface Locals {
    _id: string,
    name: string,
    address: string,
    isVerify: boolean,
    products: string,
    schedules: string,
    latitude:number,
    longitude:number,
    tags: string,
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
    info: string;
}