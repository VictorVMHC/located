import api from "./api";

const likeComment = (commentId: string ) => {
    return api.post('/api/like/comment/',  {commentId} );
}

const deleteLikeComment = (commentId: string) => {
    const route =  `/api/like/comment/${commentId}`;
    return api.delete(route);
}

export {
    likeComment,
    deleteLikeComment
}