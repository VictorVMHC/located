import { LoginResponse, logInData } from '../Interfaces/userInterfaces';
import api from "./api";

export const login = ( logInData: logInData) =>{
    return api.post<LoginResponse>('/auth/login', logInData);
}

export const auth = () =>{
    return api.get('/auth');
}

export const test = () =>{
    return api.post('/auth/login/test');
}