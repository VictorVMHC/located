import api from "./api"
import { LoginResponse, User } from '../Interfaces/userInterfaces';

export const createUser = (user: User) =>{
    return api.post<LoginResponse>('/api/users', user );
}