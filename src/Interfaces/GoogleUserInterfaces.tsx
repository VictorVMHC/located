export interface GoogleUser{
    email: string,
    familyName: string, 
    givenName: string, 
    id: string, 
    name: string, 
    photo: string, 
}

export interface LoginResponse {
    user: GoogleUser;
    token: string;
}