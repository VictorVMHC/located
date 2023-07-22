import React, { createContext, useReducer, useEffect } from 'react'
import { User, createNewUser, logInData } from '../Interfaces/userInterfaces';
import { AuthState, authReducer } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, login } from '../Api/authApi';
import { t } from 'i18next';
import { createUser } from '../Api/userApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( createNewUser: createNewUser ) => void;
    signIn: ( loginData: logInData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const AuthInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ({children}: any) => {

    const [ state, dispatch ] = useReducer( authReducer, AuthInitialState );

    useEffect(() => {
        checkToken()
    }, [] )

    const checkToken = async() => {
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

            switch(error.response.status){
                case 404: 
                dispatch({
                    type: 'addError',
                    payload: t('UserNotFound')
                })
                case 401:
                dispatch({
                    type: 'addError',
                    payload: t('InvalidCredentials')
                })
                case 500:
                dispatch({
                    type: 'addError',
                    payload: t('InternalError')
                })
                default:
                dispatch({
                    type: 'addError',
                    payload: error.response.data.error || t('ErrorMsgPayload')
                })
            }

            if(error.response.status === 404)
            {
                dispatch({
                    type: 'addError',
                    payload: t('UserNotFound')
                })
            }

            if(error.response.status === 401)
            {
                dispatch({
                    type: 'addError',
                    payload: t('InvalidCredentials')
                })
            }
            
            if(error.response.status === 500)
            {
                dispatch({
                    type: 'addError',
                    payload: t('InternalError')
                })
            }
            
            dispatch({
                type: 'addError',
                payload: error.response.data.error || t('ErrorMsgPayload')
            })
        }
    }

    const signUp = async (user: User) => {
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
            dispatch({
                type: 'addError',
                payload: error.response.data.errors || t('ErrorMsgPayload')
            })
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
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}


