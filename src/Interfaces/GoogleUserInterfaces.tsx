export interface GoogleUser{
        name?:string,
        email?:string,
        photo?:string,
        haveLocals?:boolean,
        locals?:string,
        state?:boolean,
        givenName?:string,
}

export interface createGoogleNewUser {
    name?: string,
    email?: string,
    photo?:string,
    givenName?:string,
    token?:string,
}

export interface LoginResponse {
    user: GoogleUser;
    token: string;
}