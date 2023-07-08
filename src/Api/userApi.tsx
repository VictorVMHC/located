import api from "./api"
import { User } from '../Interfaces/userInterfaces';

export const createUser = (user: User) =>{
    return api.post('/users', user );
}