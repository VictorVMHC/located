import {Like} from '../Interfaces/likesInterface'
import api from "./api";

const createLikeLocal = (localId: string) => {
    return api.post('/api/like/local/',{
        localId
    } );
}

const getLikeLocal = (idUser: string, idLocal: string) => {
    var route =`/api/like/local/${idUser}/${idLocal}`
    return api.get(route);
}

const deleteLikeLocal = (idUser: string, idLocal: string) => {
    const route =  `/api/like/local/${idUser}/${idLocal}`;
    return api.delete(route);
}
export {
    createLikeLocal,
    getLikeLocal,
    deleteLikeLocal
}