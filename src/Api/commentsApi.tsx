import api from "./api";

const getCommentsByLocalId = (localId: string, page?: number, limit?: number) => {
    const route = `/api/comments/localId/${localId}`
    return api.get( route , {
        params:{
            page,
            limit
        }
    });
}

const addComment = (localId: string, comment: string) => {
    return api.post( "/api/comments/", {
        localId,
        comment
    } );
}

const deleteComment = ( commentId: string) => {
    return api.delete(`/api/comments/${commentId}`);
}

export {
    getCommentsByLocalId,
    addComment,
    deleteComment
};
