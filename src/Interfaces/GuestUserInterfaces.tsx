export interface GuestUser{
    _id: string,
    logDate: string,
    state: boolean
}

export interface GuestResponseData{
    guestUser: GuestUser,
    token: string
}