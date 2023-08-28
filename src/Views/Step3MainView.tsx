import React, { useContext } from 'react';
import { PermissionsContext } from '../Context/PermissionsContext';
import { LoadingView } from './LoadingView';
import { LocationPermissionView } from './LocationPermissionsView';
import { Step3View } from './Step3View';

export const Step3MainView = () => {
    const { permissions } = useContext( PermissionsContext );

    if ( permissions.locationStatus === 'unavailable' ) {
        return <LoadingView />
    }
    
    return (
        <>
            {
                ( permissions.locationStatus === 'granted' )
                    ? <Step3View/>
                    : <LocationPermissionView/>
            }
        </>
    )
}
