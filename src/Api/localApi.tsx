import { NewLocal } from '../Interfaces/LocalInterfaces';
import api from "./api";

const createLocal = (local: NewLocal) => {
    return api.post('/api/locals',  local );
}

const getLocal = (id: number) => {
    const route =  `/api/locals/${id}`;
    return api.get(route);
}

export {
    createLocal,
    getLocal
}