import api from "./api";

const likeComment = (commentId: string, userId: string ) => {
    return api.post('/api/like/comment/',  {commentId, userId} );
}

const deleteLikeComment = (id: string) => {
    const route =  `/api/like/comment/${id}`;
    return api.delete(route);
}

export {
    likeComment,
    deleteLikeComment
}