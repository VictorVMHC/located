import React, { RefObject, useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../Hooks/useLocation';
import { Local } from '../Interfaces/DbInterfaces';
import { local } from '../Utils/Data _Example';
import { LoadingView } from '../Views/LoadingView';
import { CustomMarker } from './CustomMarker';
import { CarouselComponent } from './Carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { StyleSheet } from 'react-native';

interface Props {
    markers?: any,
}
const mapStyle = [
    {
        elementType: 'labels.icon',
        stylers: [
            {
            visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        stylers: [
            {
            visibility: 'off',
            },
        ],
    },
]

export const Map = ({ markers }: Props) => {
    const carouselRef = useRef<ICarouselInstance>(null);
    const mapViewRef = useRef<MapView>();
    const following  = useRef<boolean>(true);
    
    const [carouselVisible, setCarouselVisible] = useState(false);
    
    const { 
        hasLocation,
        initialPosition,
        followUserLocation,
        userLocation,
        stopFollowUserLocation
        } = useLocation();

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

    const handleMarkerPress = (index: number) => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({index, animated:true})
        }
        setCarouselVisible(true)
    };
    return (
        <>
            {
                ( !hasLocation )
                ? <LoadingView />
                :<>
                    <MapView
                        ref={ (el) => mapViewRef.current = el! }
                        style={{ flex: 1 }}
                        customMapStyle={mapStyle}
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
                                        onPress={() => handleMarkerPress(index)}                              
                                    >
                                        <CustomMarker uriImage={uriImage} />
                                    </Marker>
                                );
                            })
                        }
                    </MapView>
                    <CarouselComponent 
                        carouselRef={carouselRef} 
                        mapViewRef={mapViewRef} 
                        carouselVisible={carouselVisible} 
                        setCarouselVisible={setCarouselVisible}
                    />
                </> 
            }
        </>
    )
}
