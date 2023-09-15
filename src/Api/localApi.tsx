import { NewLocal } from '../Interfaces/LocalInterfaces';
import api from "./api";

const createLocal = (local: NewLocal) => {
    return api.post('/api/locals',  local );
}

export {
    createLocal
}