export interface Comment{
    _id: string,
    localId: string,
    userId: {
        _id: string,
        name: string,
        image: string
    },
    comment: string,
    label: string,
    countReplies: number,
    likeCount: number,
    liked: boolean
}

export interface CommentResponse{
    localId: string,
    userId: string,
    comment: string,
    replies: []
}

export interface Reply {
    _id: string,
    commentId: string,
    userId:{
        _id: string,
        name:string,
        image: string
    },
    userRepliedId:{
        _id: string,
        name:string,
    },
    replied: string,
    label: string,
    likes: number,
    liked: boolean
}
