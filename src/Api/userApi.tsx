import api from "./api"
import { LoginResponse, User} from '../Interfaces/UserInterface';

const createUser = (user: User) =>{
    return api.post<LoginResponse>('/api/users', user );
}

const putUser = async (email: string, updatedUser: User) => {
    const route= `/api/users/${email}`;
    console.log(route);
    return api.put(route, updatedUser);
}

const deleteUser = (email: string) => {
    const route =  `/api/users/${email}`;
    return api.delete(route);
}

export {
    createUser,
    putUser,
    deleteUser
}