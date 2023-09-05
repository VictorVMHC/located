import React, { useContext } from 'react';
import { PermissionsContext } from '../Context/PermissionsContext';
import { LoadingView } from './LoadingView';
import { Map } from '../Components/Map';
import { LocationPermissionView } from './LocationPermissionsView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';

export const MapsView = () => {
    const { permissions } = useContext( PermissionsContext );
    if ( permissions.locationStatus === 'unavailable' ) {
        return <LoadingView />
    }
    
    return (
        <>
            {
                ( permissions.locationStatus === 'granted' )
                    ? <Map/>
                    : <LocationPermissionView/>
            }
        </>
    )
}
