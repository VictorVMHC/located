import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import {Text, View } from 'react-native'
import { LoadingView } from './LoadingView';
import { PermissionsContext } from '../Context/PermissionsContext';
import { LocationPermissionView } from './LocationPermissionsView';
import { ForYouMainView } from './ForYouMainView';

interface Props extends NativeStackScreenProps<any, any> {};

export const ForYouView = ({ navigation, route }: Props) => {
    const { permissions } = useContext( PermissionsContext );

    if ( permissions.locationStatus === 'unavailable' ) {
        return <LoadingView />
    }
    
    return (
        <>
            {
                ( permissions.locationStatus === 'granted' )
                    ? <ForYouMainView navigation={navigation} route={route} />
                    : <LocationPermissionView/>
            }
        </>
    )
}