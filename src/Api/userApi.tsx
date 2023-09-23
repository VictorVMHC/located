import api from "./api"
import { LoginResponse, UpdateUserPassword, RecoveryPassword, User} from '../Interfaces/UserInterface';

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

const putUserPassword = async (updatedPassword: UpdateUserPassword) =>{
    
    const {oldPassword, newPassword } = updatedPassword;

    return api.put("/api/users/changePassword", {
        password: oldPassword,
        newPassword: newPassword
    });
}

const recoverUserPassword = async (recoveredPassword: RecoveryPassword) =>{
    const {userEmail, newPassword} = recoveredPassword;
    return api.put("/api/users/recoveryPassword", {
        email: userEmail,
        password : newPassword 
    })
}

export {
    createUser,
    putUser,
    putUserPassword,
    recoverUserPassword,
    deleteUser,
}