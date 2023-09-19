import React, { useContext } from 'react';
import { CreateLocalAlertView } from './CreateLocalAlertView';
import { LocalCreatorView } from './LocalCreatorView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../Context/AuthContext';
import { LoginToAccessView } from './LoginToAccessView';
import { LocalsView } from './LocalsView';

interface Props extends NativeStackScreenProps<any, any> {};

export const MyLocalsView = ({ navigation, route }: Props) => {
    const { user, guestUser } = useContext(AuthContext);
    
    if (!user?.haveLocals && !guestUser) {
        return (
            <CreateLocalAlertView
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

    return <LocalsView />;
};

