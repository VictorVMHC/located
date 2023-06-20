import React, {createContext, useState} from 'react'
import { PERMISSIONS, PermissionStatus, check, openSettings, request } from 'react-native-permissions';
import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type PermissionsState ={
    locationStatus: PermissionStatus
}
export const PermissionsInitialState: PermissionsState ={
    locationStatus: 'unavailable',
}
type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps );

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(PermissionsInitialState);
    
    const checkLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
        permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    const askLocationPermission = async() => {
        
        let permissionStatus: PermissionStatus;

        permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        if ( permissionStatus === 'blocked' ) {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });

    }

    useEffect(() => {
        checkLocationPermission();

        AppState.addEventListener('change', (state: AppStateStatus) =>{
            if( state !== 'active') return;

            checkLocationPermission();
        });
    }, []);

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission,
        }}>
            { children}
        </PermissionsContext.Provider>
    )
}
