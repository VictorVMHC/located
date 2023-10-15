import api from "./api";

const addReply = (commentId: string, userRepliedId: string, reply: string) => {
    console.log(commentId, reply, userRepliedId);
    
    return api.post( "/api/reply", {
            commentId,
            userRepliedId,
            reply
        }
    );
}

const getRepliesByCommentId= (commentId: string, page?: number, limit?: number) => {
    const route = `/api/reply/byCommentId/${commentId}`
    return api.get( route , {
        params:{
            page,
            limit
        }
    });
}

const deleteReply = ( replyId: string) => {
    return api.delete(`/api/reply/${replyId}`);
}

export {
    getRepliesByCommentId,
    addReply,
    deleteReply
};
