import { GuestResponseData } from "../Interfaces/GuestUserInterfaces";
import api from "./api";

const GuestLogIn = () => {
    return api.post<GuestResponseData>('api/guest/users');
}

export {
    GuestLogIn
}