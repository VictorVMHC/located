export interface Comment{
    userId: string,
    localId: string
}

export interface CommentResponse{
    localId: string,
    userId: string,
    comment: string,
    replies: []
}
