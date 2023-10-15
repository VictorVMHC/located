import React, { useRef, useState, useEffect, useContext } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../Hooks/useLocation';
import { LoadingView } from '../Views/LoadingView';
import { CustomMarker } from './CustomMarker';
import { CarouselComponent } from './Carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { searchLocalWithLikes } from '../Api/searchLocalsApi';
import { useFocusEffect } from '@react-navigation/native';
import { Local } from '../Interfaces/DbInterfaces';
import { AuthContext } from '../Context/AuthContext';
import { CustomAlert } from './CustomAlert';

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
    const [dataLocals, setDataLocals] = useState<Local[]>([]); 
    const [hasFetchedData, setHasFetchedData] = useState(false); 
    const {user}  = useContext(AuthContext);
    


    const fetchData = async (latitude: number, longitude: number) => {
        const userId = user?._id || 'null';
            try {
                const resultsLocals = await searchLocalWithLikes(
                    latitude,
                    longitude,
                    radioKm,
                    userId
                );
                const paginatedResults = resultsLocals.data.results;
                setDataLocals(paginatedResults);
                setHasFetchedData(true);
            } catch (error: any) {
                if(error.response.status === 404){
                    CustomAlert({
                        title: "Error",
                        desc: "Was not possible to retrieve the locals, ¡Please try again!",
                    });
                }
                if(error.response.status === 500){
                    CustomAlert({
                        title: "Error",
                        desc: "Internal Server Error"
                    });
                }
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
            setDataLocals([]);
        }, [])
    );

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
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
                            {dataLocals.map(({ location, uriImage }: Local, index: number) => {
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
                            dataLocal={dataLocals}
                        />
                    </>
            }
        </>
    )
}