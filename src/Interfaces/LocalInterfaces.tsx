import { Contact, Schedule } from "./DbInterfaces";
import { Location } from "./MapInterfaces";

export interface NewLocal {
    name: string;
    description: string;
    businessType: string;
    address: string;
    country:  string;
    state: string;
    town: string;
    postalCode: string;
    location: Location;
    schedules: Schedule[];
    tags: string[];
    contact: {
        [type: string]: Contact;
    };
    uriImage: string;
    rate?: number;
    quantityRate?: number;
}

const initialLocation: Location = {
    latitude: 0,
    longitude: 0,
}

export const LocalInitialState: NewLocal ={
    name: '',
    description: '',
    businessType: '',
    address: '',
    country:  '',
    state: '',
    town: '',
    uriImage: '',
    schedules:  [],
    tags: [],
    location: initialLocation,
    postalCode: '',
    contact:{},
}