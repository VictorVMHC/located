import api from "./api";

const likeReply = ( replyId: string ) => {
    return api.post('/api/like/reply/',  {replyId} );
}

const deleteLikeReply = (replyId: string) => {
    const route =  `/api/like/reply/${replyId}`;
    return api.delete(route);
}

export {
    likeReply,
    deleteLikeReply
}