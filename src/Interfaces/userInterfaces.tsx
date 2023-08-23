export interface User {
    name?: string,
    email: string,
    password?: string,
    image?: string,
    phone?:string,
    age?: number,
    google?: boolean,
    facebook?: boolean,
    address?: string,
    haveLocals?: boolean,
    state?: boolean,
    username?: string
}

export interface createNewUser {
    name?: string,
    email: string,
    password?: string,
    phone?:string,
    age?: number,
    username?:string,
}

export interface logInData {
    email?: string,
    password?: string,
}

export interface LoginResponse {
    user: User;
    token: string;
}