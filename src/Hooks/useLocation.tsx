import Geolocation from '@react-native-community/geolocation';
import { useEffect, useRef, useState } from 'react';
import { Location } from '../Interfaces/MapInterfaces';

export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);

    const [ initialPosition, setInitialPosition ] = useState<Location>({
        longitude: 0,
        latitude: 0
    });

    const [ userLocation, setUserLocation] = useState<Location>({
        longitude: 0,
        latitude: 0
    });

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])
    
    const watchId = useRef<number>();
    const isMounted = useRef(true);
    
    const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (err) => reject({ err }), { enableHighAccuracy: true }
            );
        });
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {
                if( !isMounted.current ) return;
                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                setUserLocation( location );
            },
            (err) => console.log(err), { enableHighAccuracy: true, distanceFilter: 10 }
        );
    }

    const stopFollowUserLocation = () => {
        if( watchId.current )
            Geolocation.clearWatch( watchId.current );
    }

    useEffect(() => {
        getCurrentLocation()
            .then( location => {
                if( !isMounted.current ) return;
                setInitialPosition(location);
                setUserLocation(location);
                setHasLocation(true);
            });
    }, []);

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
        userLocation
    }
}