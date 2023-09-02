import api from "./api"
import { LoginResponse, User} from '../Interfaces/UserInterface';

const createUser = (user: User) =>{
    return api.post<LoginResponse>('/api/users', user );
}

const putUser = async ( updatedUser: User ) => {
    return api.put('/api/users/', updatedUser);
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