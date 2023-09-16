import React from 'react';
import { CreateLocalAlertView } from './CreateLocalAlertView';
import { LocalCreatorView } from './LocalCreatorView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface Props extends NativeStackScreenProps<any, any>{};

export const MyLocalsView = ({navigation, route}:Props) => {
    return (
        <CreateLocalAlertView
            navigation={navigation}
            route={route}
        />
    )
}

