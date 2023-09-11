import { LoginResponse, logInData } from '../Interfaces/UserInterface';
import api from "./api";

const login = ( logInData: logInData) => {
    return api.post<LoginResponse>('/auth/login', logInData);
}

const googleLogin = (email: string, idToken: string) => {

    return api.post<LoginResponse>('/auth/google/login', {email: email}, {
        headers: {
            'x-token': idToken,
            'Content-Type': 'application/json',
        },
    });
};

const auth = () =>{
    return api.get('/auth');
}

const test = () =>{
    return api.post('/auth/login/test');
}

export {
    login,
    auth,
    test,
    googleLogin
}