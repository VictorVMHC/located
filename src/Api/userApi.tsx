import api from "./api"
import { LoginResponse, User} from '../Interfaces/UserInterfaces';

const createUser = (user: User) =>{
    return api.post<LoginResponse>('/api/users', user );
}

export {
    createUser,
}