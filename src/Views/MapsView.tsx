import React, { useContext, useEffect, useState } from 'react';
import { PermissionsContext } from '../Context/PermissionsContext';
import { LoadingView } from './LoadingView';
import { Map } from '../Components/Map';
import { LocationPermissionView } from './LocationPermissionsView';

export const MapsView = () => {
    const { permissions } = useContext( PermissionsContext );
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        setIsInView(true);
        console.log('hola');
         // Establece isInView a true cuando el usuario entra en la vista
    }, []);

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
