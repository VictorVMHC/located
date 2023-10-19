import api from "./api";

const createLikeLocal = (localId: string) => {
    return api.post('/api/like/local/',  {localId} );
}

const getLikeLocal = (localId: string) => {
    var route =`/api/like/local/${localId}`
    return api.get(route);
}

const deleteLikeLocal = (localId: string) => {
    const route =  `/api/like/local/${localId}`;
    return api.delete(route);
}
export {
    createLikeLocal,
    getLikeLocal,
    deleteLikeLocal
}