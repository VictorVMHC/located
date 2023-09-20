export interface User {
    name?: string,
    email: string,
    image?: string,
    phone?:string,
    age?: number | null,
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
    age?: number | null,
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

export interface UserUpdate {
    name?: string,
    email: string,
    image?: string,
    phone?:string,
    age?: number | null,
    google?: boolean,
    facebook?: boolean,
    address?: string,
    haveLocals?: boolean,
    state?: boolean,
    username?: string
}

export interface UpdateUserPassword {
    oldPassword?: string,
    newPassword?: string,
    confirmNewPassword?: string,
}

export interface RecoveryPassword{
    userEmail?: string,
    newPassword?: string,
    repeatPassword?: string,
}