import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, ActivityIndicator} from 'react-native'
import { Card } from '../Components/Card'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { searchPopularLocals } from '../Api/searchLocalsApi';
import { useLocation } from '../Hooks/useLocation';
import { Local } from '../Interfaces/DbInterfaces';
import { ThereAreNoLocals } from './ThereAreNoLocals';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CustomAlert } from './CustomAlert';

interface Props extends NativeStackScreenProps<any, any>{};

export const PopularLocals = ({navigation}:Props) => {
    const [dataLocals, setDataLocals] = useState<Local[]>([]); 
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);
    const radioKm = 2.0;

    const localSearch = async (latitude: number, longitude: number) =>{
        try {
            const resultsLocals = await searchPopularLocals(latitude, longitude, radioKm);
            const listLocals = resultsLocals.data.results;
            if (listLocals.length !== 0) {             
                setDataLocals(listLocals);
                setHasFetchedData(true);
                setLoading(false);
            } else {
                setEmptyData(true);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                CustomAlert({
                    title: "Error",
                    desc: "An error occurred while trying to find popular locals"
                });
            } else {
                CustomAlert({
                    title: "Error",
                    desc: 'Error: ' + error.message
                });
            }
        }
    }

    const updateLike = async () => {
        try {
            const updatedResultsLocals = await searchPopularLocals(userLocation.latitude, userLocation.longitude, radioKm);
            const updatedListLocals = updatedResultsLocals.data.results;
            setDataLocals(updatedListLocals);
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                CustomAlert({
                    title: "Error",
                    desc: "An error occurred while trying to find popular locals"
                });
            } else {
                CustomAlert({
                    title: "Error",
                    desc: 'Error: ' + error.message
                });
            }   
        }
    }

    const { hasLocation, userLocation } = useLocation();

    useFocusEffect(
        React.useCallback(() => {
            setHasFetchedData(false);
            setEmptyData(false);
            setLoading(true);
            setDataLocals([]);
        }, [])
    );

    useEffect(() => {
        if (!hasLocation) return;
        if (!hasFetchedData) {
            localSearch(userLocation.latitude, userLocation.longitude);
        }
    }, [userLocation, hasLocation, hasFetchedData, emptyData]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
        {loading && emptyData ? (
            <ThereAreNoLocals
                text={'No se ha encontrado ningún local'}
                information={'Al parecer no se pudo encontrar ningún local calificado por tu zona'}
            />
        ) : (
            <FlatList
            data={dataLocals}
            renderItem={ ( { item } ) => {
            return(
                <Card 
                    like={item.liked} 
                    navigation={navigation}
                    local={item}
                    updateLike={updateLike}
                />
            )
        } }
        keyExtractor={(item) => item._id }
        ListFooterComponent={() => (
            loading ? <ActivityIndicator size="large" color={Colors.orange} /> : null
        )}
    />
        )}
    </SafeAreaView>
    );
}; 
