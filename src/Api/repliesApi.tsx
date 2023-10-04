import api from "./api";

const getReliesByCommentId= (commentId: string, page?: number, limit?: number) => {
    const route = `/api/reply/byCommentId/${commentId}`
    return api.post( route , {
        params:{
            page,
            limit
        }
    });
}

export {
    getReliesByCommentId
};
