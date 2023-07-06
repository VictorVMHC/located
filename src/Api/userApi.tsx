import api from "./api"
import { User } from '../Interfaces/userInterfaces';
import { BASE_URL } from "@env";

export const createUser = (user: User) =>{
    console.log(BASE_URL)
    return api.post('/users', user );
}