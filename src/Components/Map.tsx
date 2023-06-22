import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../Hooks/useLocation';
import { Local } from '../Interfaces/DbInterfaces';
import { local } from '../Utils/Data _Example';
import { LoadingView } from '../Views/LoadingView';
import { CustomMarker } from './CustomMarker';
import { CarouselComponent } from './Carousel';

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
                :<>
                    <MapView
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
                        >
                            {
                                local.map(({ uriImage, location}: Local, index ) => {
                                    return (
                                        <Marker
                                            key={index.toString()}
                                            coordinate={location}
                                            anchor={{ x: 0.3, y: 0.6 }}                               
                                        >
                                            <CustomMarker uriImage={uriImage} />
                                        </Marker>
                                    );
                                })
                            }
                    </MapView>
                    <CarouselComponent/>
                </> 
            }
        </>
    )
}