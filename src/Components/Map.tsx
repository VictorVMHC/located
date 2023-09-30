import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../Hooks/useLocation';
import { LoadingView } from '../Views/LoadingView';
import { CustomMarker } from './CustomMarker';
import { CarouselComponent } from './Carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { searchLocals } from '../Api/searchLocalsApi';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { useFocusEffect } from '@react-navigation/native';
import { Local } from '../Interfaces/DbInterfaces';

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
    const following = useRef<boolean>(true);
    const [carouselVisible, setCarouselVisible] = useState(false);
    const radioKm = 0.5;
    const [datosLocales, setDatosLocales] = useState<Local[]>([]); 
    const [hasFetchedData, setHasFetchedData] = useState(false); 
    


    const fetchData = async (latitude: number, longitude: number) => {
            try {
                const resultados = await searchLocals(
                    latitude,
                    longitude,
                    radioKm
                );
                const paginatedResults = resultados.data.results;
                setDatosLocales(paginatedResults);
                setHasFetchedData(true);
            } catch (error) {
                console.error(error);
            }
    };

    const {
        hasLocation,
        initialPosition,
        followUserLocation,
        userLocation,
        stopFollowUserLocation
    } = useLocation();

    useFocusEffect(
        React.useCallback(() => {
            setHasFetchedData(false);
        }, [])
    );

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
        console.log(hasFetchedData);
        if(!hasLocation){
            return ;
        }
        if (!hasFetchedData) {
            fetchData(userLocation.latitude, userLocation.longitude);
        }
    },[userLocation, hasLocation, hasFetchedData]);


    useEffect(() => {
        if (!following.current) return;
        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        });
    }, [userLocation]);

    const handleMarkerPress = (index: number) => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ index, animated: true })
            setCarouselVisible(true)
        }
    };
    return (
        
        <>
            {
                (!hasLocation)
                    ? <LoadingView />
                    : <>
                        <MapView
                            ref={(el) => mapViewRef.current = el!}
                            style={{ flex: 1 }}
                            customMapStyle={mapStyle}
                            showsUserLocation
                            initialRegion={{
                                latitude: initialPosition.latitude,
                                longitude: initialPosition.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            zoomControlEnabled
                            onTouchStart={() => following.current = false}
                        > 
                            {datosLocales.map(({ location, uriImage }: NewLocal, index: number) => {
                                {
                                }
                                return (
                                    <Marker
                                        key={index.toString()}
                                        coordinate={{
                                            latitude: location.latitude,
                                            longitude: location.longitude
                                        }}
                                        anchor={{ x: 0.5, y: 0.10 }}
                                        onPress={() => handleMarkerPress(index)}
                                    >
                                        {<CustomMarker uriImage={uriImage ? uriImage :'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'}/>}
                                    </Marker> 
                                );
                            })}
                        </MapView>
                        <CarouselComponent
                            carouselRef={carouselRef}
                            mapViewRef={mapViewRef} carouselVisible={carouselVisible} setCarouselVisible={setCarouselVisible}    
                            datosLocales={datosLocales}
                        />
                    </>
            }
        </>
    )
}