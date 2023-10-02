import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { Card } from '../Components/Card'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { searchPopularLocals } from '../Api/searchLocalsApi';
import { useLocation } from '../Hooks/useLocation';
import { Local } from '../Interfaces/DbInterfaces';
import { ThereAreNoLocals } from './ThereAreNoLocals';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Props extends NativeStackScreenProps<any, any>{};

export const PopularLocals = ({navigation}:Props) => {
    const [dataLocals, setDataLocals] = useState<Local[]>([]); 
    const [hasFetchedData ,setHasFetchedData] = useState(false);
    const [emptyData, setEmptyData] = useState(false);
    const [loading, setLoading] = useState(true);
    const radioKm = 0.0

    const localSearch = async (latitude: number, longitude: number) =>{
        try{
            const resultsLocals = await searchPopularLocals(
                latitude, 
                longitude, 
                radioKm
            );
            const listLocals = resultsLocals.data.results;
            if(listLocals.length !== 0){
                setDataLocals(listLocals);
                setHasFetchedData(true);
                setLoading(false);
                setLoading(true);
                
            }else{
                setEmptyData(true);
            }
        }catch(error){
        }
    }

    const {
        hasLocation,
        userLocation,
    } = useLocation();

    useFocusEffect(
        React.useCallback(() => {
            setHasFetchedData(false);
            setEmptyData(false);
        }, [])
    );

    useEffect(() => {
        if(!hasLocation){
            return ;
        }
        if (!hasFetchedData) {
        localSearch(userLocation.latitude, userLocation.longitude);
        }
    },[userLocation, hasLocation, hasFetchedData, emptyData]);

    return (
        <SafeAreaView style={styles.container}>
            {loading  && emptyData ?(
                <ThereAreNoLocals
                    text={'No se ha encontrado ningún local'}
                    information={'Al parecer no se pudo encontrar ningún local calificado por tu zona'}
                />
            ):(
                <FlatList
                    data={dataLocals}
                    renderItem={ ( { item } ) => {
                    return(
                        <Card 
                            like={false} 
                            newLocal={item} 
                            routeToStore={() => navigation.navigate("StoreView")}
                            navigation={navigation}
                            id={item._id}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});