import { LoginResponse, logInData } from '../Interfaces/UserInterfaces';
import api from "./api";

const login = ( logInData: logInData) => {
    return api.post<LoginResponse>('/auth/login', logInData);
}

const auth = () =>{
    return api.get('/auth');
}

const test = () =>{
    return api.post('/auth/login/test');
}

export {
    login,
    auth,
    test
}