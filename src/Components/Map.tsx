import React, { useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { useLocation } from '../Hooks/useLocation';
import { LoadingView } from '../Views/LoadingView';

interface Props {
    markers?: any,
}
export const Map = ({ markers }: Props) => {
    const { 
        hasLocation,
        initialPosition,
        followUserLocation,
        userLocation,
        stopFollowUserLocation
        } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following  = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {

        if( !following.current ) return;

        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });
    }, [ userLocation ]);
    
    return (
        <>
            {
                ( !hasLocation )
                ? <LoadingView />
                : <MapView
                        ref={ (el) => mapViewRef.current = el! }
                        style={{ flex: 1 }}
                        showsUserLocation
                        initialRegion={{
                            latitude: initialPosition.latitude,
                            longitude: initialPosition.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onTouchStart={ () => following.current = false }
                    />
            }
        </>
    )
}
