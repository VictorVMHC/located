import api from "./api"
import { LoginResponse, User} from '../Interfaces/UserInterfaces';

const createUser = (user: User) =>{
    return api.post<LoginResponse>('/api/users', user );
}

const getUser = async (email: string, token: string) => {
    const route = `/api/users/${email}`;
    const response = await api.get(route, {
        headers: {
            'x-token': token
        }
    });
    return response.data;
}

export {
    createUser,
    getUser
}