import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { useLocation } from '../Hooks/useLocation';
import { fetchData } from '../Utils/FetchFunctions';
import { useFocusEffect } from '@react-navigation/native';
import { foodTags } from '../Utils/ArraysTags';
interface Props {
    kilometers: number;
};

export const FoodView = ({kilometers}:Props) => {
    const [dataLocals, setDataLocals] = useState<NewLocal[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMoreLocales = async () =>{
        fetchData(userLocation.latitude, userLocation.longitude, kilometers, tag, limit)
        const limit = 2
        const results = await Promise.all(foodTags.map(tag => ));
        const combinedResults = results.flat(); 
        setDataLocals(combinedResults);
    }

    const {
        hasLocation,
        userLocation,
    } = useLocation();

    useEffect(() => {
        console.log('hola useEffect');
        if(!hasLocation){
            return ;
        }
    
        fetchMoreLocales ();
    },[userLocation, hasLocation, kilometers ]);

    const onEndReached = () => {
        if (currentPage <= totalPages) {
            fetchMoreLocales();
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                numColumns={2}
                data={dataLocals}
                renderItem={ ( { item } ) => {
                    return(
                        <CardCloseToMe Img={'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} like={false} Name={item.name} categories={item.tags[0]}
                        />
                    )
                } }
                keyExtractor={(item) => item.name.toString()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
