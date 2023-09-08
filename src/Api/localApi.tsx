import { NewLocal } from "../Interfaces/LocalInterfaces";
import api from "./api";

const createLocal = (businessType: NewLocal) =>{
    return api.post('/api/businessTypes', {businessType} );
};