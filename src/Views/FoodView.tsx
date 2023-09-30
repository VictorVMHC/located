import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { Local } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';
import { foodTags } from '../Utils/ArraysTags';
import { fetchData } from '../Utils/FetchFunctions';
import { useNavigation } from '@react-navigation/native';
interface Props {
    kilometers: number;
    latitude: number,
    longitude:number
};

export const FoodView = ({kilometers, latitude, longitude}:Props) => {
    const [dataLocals, setDataLocals] = useState<Local[]>([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const fetchMoreLocales  = async () =>{
        try{
            if(page <= totalPage && !fetching){
                setFetching(true)    
                const {locals, totalPages} = await fetchData(latitude, longitude, kilometers,foodTags, page);           
                if (locals) {
                    setDataLocals([...dataLocals, ...locals]);
                    setTotalPage(totalPages);
                    setFetching(false);
                    setLoading(false); 
                }
                setPage(page + 1);
            }
        }catch (error){
            console.error('Error fetching locales:', error);
        }
    }

    useEffect(() => {
        setPage(1);
        setTotalPage(1);
        setDataLocals([]);
        setLoading(true);
    },[kilometers]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                numColumns={2}
                data={dataLocals}
                renderItem={ ( { item } ) => {
                    return(
                        <CardCloseToMe 
                        Img={'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} 
                        like={false} 
                        Name={item.name} 
                        categories={item.tags[0]}
                        navigation={navigation}
                        id={item._id} 
                        />
                    )
                } }
                keyExtractor={(item) => item._id }
                onEndReached={fetchMoreLocales} 
                onEndReachedThreshold={0.1} 
                ListFooterComponent={()=>(
                    loading ? <ActivityIndicator size="large" color={Colors.orange} /> : null
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
