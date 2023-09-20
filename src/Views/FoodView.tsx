import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { useLocation } from '../Hooks/useLocation';
import { fetchData } from '../Utils/FetchFunctions';
import { foodTags } from '../Utils/ArraysTags';
interface Props {
    kilometers: number;
};

export const FoodView = ({kilometers}:Props) => {
    const [dataLocals, setDataLocals] = useState<NewLocal[]>([]);
    

    const fetchMoreLocales  = async () =>{
        const combinedResults = await fetchData(userLocation.latitude, userLocation.longitude, kilometers,foodTags);
        if (combinedResults) {
            setDataLocals(combinedResults);
           // setCurrentPage(prevPage => prevPage + 1);
        }
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
    },[userLocation, hasLocation, kilometers]);



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
                onEndReached={fetchMoreLocales} 
                onEndReachedThreshold={0.1} 
                ListFooterComponent={<ActivityIndicator size="large" color="#0000ff" />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
