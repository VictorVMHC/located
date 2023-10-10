import React, { useContext } from 'react'
import { PermissionsContext } from '../Context/PermissionsContext';
import { LoadingView } from './LoadingView';
import { LocationPermissionView } from './LocationPermissionsView';
import { PopularLocals } from '../Components/PopularLocals'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {};

export const PopularView = ({ navigation, route }: Props) => {
    const { permissions } = useContext( PermissionsContext );

    if ( permissions.locationStatus === 'unavailable' ) {
        return <LoadingView />
    }
    
    return (
        <>
            {
                ( permissions.locationStatus === 'granted' )
                    ? <PopularLocals navigation={navigation} route={route}/>
                    : <LocationPermissionView/>
            }
        </>
    )
}; 
