import api from "./api";

const getCommentsByLocalId = (localId: string, page?: number, limit?: number) => {
    const route = `/api/comments/localId/${localId}`
    return api.post( route , {
        params:{
            page,
            limit
        }
    });
}

export {
    getCommentsByLocalId
};
