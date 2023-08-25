import React, {createContext, useState} from 'react'
import { PERMISSIONS, PermissionStatus, check, openSettings, request } from 'react-native-permissions';
import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type PermissionsState ={
    locationStatus: PermissionStatus
    cameraStatus: PermissionStatus
}

export const PermissionsInitialState: PermissionsState ={
    locationStatus: 'unavailable',
    cameraStatus: 'unavailable'
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
    askCameraPermission: () => void;
    checkCameraPermission: () => void;
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

    const askCameraPermission = async() => {
        let permissionStatus: PermissionStatus;
        permissionStatus = await check( PERMISSIONS.ANDROID.CAMERA );

        setPermissions({
            ...permissions,
            cameraStatus: permissionStatus
        });
    }

    const checkCameraPermission = async() => {
        
        let permissionStatus: PermissionStatus;

        permissionStatus = await request( PERMISSIONS.ANDROID.CAMERA );
        if ( permissionStatus === 'blocked' ) {
            openSettings();
        }

        setPermissions({
            ...permissions,
            cameraStatus: permissionStatus
        });

    }

    useEffect(() => {
        checkLocationPermission();
        checkCameraPermission();

        AppState.addEventListener('change', (state: AppStateStatus) =>{
            if( state !== 'active') return;
            checkLocationPermission();
            checkCameraPermission();
        });
        
    }, []);

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission,
            askCameraPermission,
            checkCameraPermission
        }}>
            { children}
        </PermissionsContext.Provider>
    )
}
