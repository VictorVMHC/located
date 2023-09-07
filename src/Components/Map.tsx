import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../Hooks/useLocation';
import { Locals } from '../Interfaces/DbInterfaces';
import { LoadingView } from '../Views/LoadingView';
import { CustomMarker } from './CustomMarker';
import { CarouselComponent } from './Carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import { searchLocalsRad } from '../Api/searchLocalsApi';
import { useFocusEffect } from '@react-navigation/native';

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
    const radioKm = 0.2
    const [datosLocales, setDatosLocales] = useState<Locals[]>([]); 
    


    const fetchData = async (latitude: number, longitude: number) => {
            try {
                console.log('Obteniendo datos...');
                const resultados = await searchLocalsRad(
                    'locals',
                    latitude,
                    longitude,
                    radioKm
                );
                const paginatedResults = resultados.data.results;
                setDatosLocales(paginatedResults);
                
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

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
        console.log('hola useEffect');
        console.log(datosLocales)
        if(!hasLocation){
            return ;
        }
        if(datosLocales.length === 0 ){
            fetchData(userLocation.latitude, userLocation.longitude);
        }
    },[userLocation]);

    useEffect(() => {
        if (!following.current) return;
        const { latitude, longitude } = userLocation;
        console.log(latitude)
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
                            {datosLocales.map(({ latitude, longitude }: Locals, index) => {
                                {console.log(index);
                                }
                                return (
                                    <Marker
                                        key={index.toString()}
                                        coordinate={{
                                            latitude: latitude,
                                            longitude: longitude
                                        }}
                                        anchor={{ x: 0.5, y: 0.10 }}
                                        onPress={() => handleMarkerPress(index)}
                                    >
                                        {<CustomMarker uriImage='https://www.pequerecetas.com/wp-content/uploads/2021/03/comidas-rapidas.jpg' />}
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