import api from "./api";
import { LoginResponse, GoogleUser} from '../Interfaces/GoogleUserInterfaces'

const createGoogleUser = (googleUser: GoogleUser, idToken: string) => {
    return api.post('/api/google/users', googleUser , {
        headers: {
            'x-token': idToken,
            'Content-Type': 'application/json',
        },
    });
}

export {
    createGoogleUser
}