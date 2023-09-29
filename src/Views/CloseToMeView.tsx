
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext } from 'react';
import { LoadingView } from './LoadingView';
import { LocationPermissionView } from './LocationPermissionsView';
import { PermissionsContext } from '../Context/PermissionsContext';
import { CloseToMeMainView } from './CloseToMeMainView';


const Tab = createMaterialTopTabNavigator();

export const CloseToMeView = () =>{
const { permissions } = useContext( PermissionsContext );

if ( permissions.locationStatus === 'unavailable' ) {
    return <LoadingView />
}

return (
    <>
    {
        ( permissions.locationStatus === 'granted' )
            ?   <CloseToMeMainView/>
            :   <LocationPermissionView/>
    }
    </>
);
}

