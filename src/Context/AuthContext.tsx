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
    singUp: ( createNewUser: createNewUser ) => void;
    singIn: ( loginData: logInData ) => void;
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
        const token = await AsyncStorage.getItem('token');

        if(!token){
            return dispatch({type: 'notAuthenticated'})
        }

        const response = await auth();
        if (response.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' })
        }

        await AsyncStorage.setItem( 'token', response.data.token );
        dispatch({
            type: 'signUp',
            payload: {
                token: response.data.token,
                user: response.data.user
            }
        })
    }

    const singIn = async (loginData: logInData) => {
        try {
            const { data } = await login(loginData);
            await AsyncStorage.setItem('token', data.token);
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            })
        } catch(error: any){
            dispatch({
                type: 'addError',
                payload: error.response.data.errors || t('ErrorMsgPayload')
            })
        }
    }

    const singUp = async (user: User) => {
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
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}


