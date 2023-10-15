import React, { useContext } from 'react';
import { CreateLocalAlertView, } from './CreateLocalAlertView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../Context/AuthContext';
import { LoginToAccessView } from './LoginToAccessView';
import { LocalsView } from './LocalsView';
import { CreateProductView } from './CreateProductView';

interface Props extends NativeStackScreenProps<any, any> {};

export const MyLocalsView = ({ navigation, route }: Props) => {
    const { user, guestUser } = useContext(AuthContext);
    
    if (!user?.haveLocals && !guestUser) {
        return (
            <CreateProductView
                navigation={navigation}
                route={route}
            />
        );
    }

    if (guestUser !== null) {
        return (
            <LoginToAccessView
                navigation={navigation}
                route={route}
            />
        );
    }

    return <LocalsView 
            navigation={navigation}
            route={route}
        />;
};

