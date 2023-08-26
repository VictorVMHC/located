import React, { createContext, useReducer, useEffect } from 'react'
import { User, createNewUser, logInData } from '../Interfaces/UserInterfaces';
import { AuthState, authReducer } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, login } from '../Api/authApi';
import { t } from 'i18next';
import { createUser, getUser } from '../Api/userApi';
import { GuestLogIn } from '../Api/guestUser';
import { GuestUser } from '../Interfaces/GuestUserInterfaces';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    guestUser: GuestUser | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( createNewUser: createNewUser ) => void;
    signIn: ( loginData: logInData ) => void;
    signInGuest: () => void;
    logOut: () => void;
    removeError: () => void;
}

const AuthInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
    guestUser: null
}

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ({children}: any) => {

    const [ state, dispatch ] = useReducer( authReducer, AuthInitialState );

    useEffect(() => {
        checkToken()
    }, [] )

    const checkToken = async() => {
        try{            
            const token = await AsyncStorage.getItem('x-token');
            if(!token){
                return dispatch({type: 'notAuthenticated'})
            }
    
            const response = await auth();
            
            if (response.status !== 200 ) {
                return dispatch({ type: 'notAuthenticated' })
            }
    
            await AsyncStorage.setItem( 'x-token', response.data.token );
    
            dispatch({
                type: 'signUp',
                payload: {
                    token: response.data.token,
                    user: response.data.user
                }
            })
        }catch(err){
            return dispatch({ type: 'notAuthenticated' })
        }
    }

    const signIn = async (loginData: logInData) => {
        try {
            dispatch({
                type: 'checking'
            })

            const { data } = await login(loginData);

            await AsyncStorage.setItem('x-token', data.token);

            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            })            
        } catch(error: any){

            if (error.code === 'ECONNABORTED'){                
                return dispatch({
                    type: 'addError',
                    payload: t('TimeOutConn')
                });
            }

            switch(error.response.status){
                case 404: 
                    return dispatch({
                        type: 'addError',
                        payload: t('UserNotFound')
                    });

                case 401:
                    return dispatch({
                        type: 'addError',
                        payload: t('InvalidCredentials')
                    });
                    
                case 500:
                    return dispatch({
                        type: 'addError',
                        payload: t('InternalError')
                    });

                default:
                    return dispatch({
                        type: 'addError',
                        payload: error.response.data.error || t('ErrorMsgPayload')
                    });
            }
        }
    }
    
    const signInGuest = async () => {        
        try {

            dispatch({
                type: 'checking'
            })

            const { data } = await GuestLogIn();            

            await AsyncStorage.setItem('x-token', data.token);

            const user: User = {
                name: "Guest",
                username: 'Guest',
                email: 'Guest@User.com',
                haveLocals: false
            }
            
            dispatch({
                type: 'signUpGuest',
                payload: {
                    token: data.token,
                    user: user,
                    guestUser: data.guestUser
                }
            })

        } catch(error: any){
            if (error.code === 'ECONNABORTED'){                
                return dispatch({
                    type: 'addError',
                    payload: t('TimeOutConn')
                });
            } 

            return dispatch({
                type: 'addError',
                payload: error.response?.data?.error || t('ErrorMsgPayload')
            });
        }
    }

    const signUp = async (user: createNewUser) => {
        try{
            const { data } = await createUser(user);
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });
        }catch(error: any){
            let errorMessages = [];
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                for (let i = 0; i < errors.length; i++) {
                    if (errors[i].msg) {
                        errorMessages.push(errors[i].msg);
                    }
                }
            }
            const errorMessage = errorMessages.length > 0
            ? errorMessages.join('\n') // Concatenar mensajes de error con saltos de línea
            : t('ErrorMsgPayload'); // Mensaje predeterminado

            dispatch({
                type: 'addError',
                payload: errorMessage
            });

        }
    }

    const logOut = async() => {
        await AsyncStorage.removeItem('x-token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            signInGuest,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}


