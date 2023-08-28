import { GuestUser } from '../Interfaces/GuestUserInterfaces';
import { User } from "../Interfaces/UserInterface";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated' ;
    token: string | null;
    errorMessage: string;
    user: User | null;
    guestUser: GuestUser | null;
}
type AuthAction = 
    | { type: 'signUp', payload: { token: string, user: User } }
    | { type: 'signUpGuest', payload: { token: string, user: User, guestUser: GuestUser } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }
    | { type: 'checking' }

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch(action.type){
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }
    
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }
        case 'signUpGuest':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                guestUser: action.payload.guestUser
            }
        case 'logout':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
                guestUser: null
            }

        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }

        case 'checking':
            return {
                ...state,
                status: 'checking',
            }

        default:
            return state;
    }
}