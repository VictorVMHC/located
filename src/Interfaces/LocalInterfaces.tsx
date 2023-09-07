import { Contact, Schedule } from "./DbInterfaces";
import { Location } from "./MapInterfaces";

export interface NewLocal {
    name: string;
    description: string;
    businessType: string;
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
    uriImage: string
}