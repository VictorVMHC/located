import { GoogleUser } from '../Interfaces/GoogleUserInterfaces';
import api from "./api";

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
};
