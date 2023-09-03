import api from "./api";
import { LoginResponse, GoogleUser} from '../Interfaces/GoogleUserInterfaces'

const createGoogleUser = (googleuser: GoogleUser) =>{
    return api.post<LoginResponse>('/api/google/users', googleuser);
}

export {
    createGoogleUser
}