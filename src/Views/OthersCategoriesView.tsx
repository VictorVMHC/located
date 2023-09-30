import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { fetchData } from '../Utils/FetchFunctions';
import { Colors } from '../Themes/Styles';
import { Local } from '../Interfaces/DbInterfaces';
import { useNavigation } from '@react-navigation/native';
import {ThereAreNoLocals} from '../Components/ThereAreNoLocals'
interface Props {
    kilometers: number;
    latitude: number,
    longitude:number
};



export const OthersCategoriesView = ({kilometers, latitude, longitude}:Props) => {
    const [dataLocals, setDataLocals] = useState<Local[]>([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [heightContainerTexInput, setHeightContainerTexInput] = useState(0.5);
    const navigation = useNavigation();
    const [fetching, setFetching] = useState(false);
    const [f, setf] = useState(false);
    const [noLocalsFound, setNoLocalsFound] = useState(false);

    const updateDataStyles = (valueHeightContainerTexInput: number) => {
        setHeightContainerTexInput(valueHeightContainerTexInput);
    }

/* const fetchDataAndUpdateLocals = async (pageToFetch: number = 1) => {
        setLoading(true);
        fetchData(
            latitude, longitude, kilometers, [foodTagsInput], pageToFetch
        ).then(
            ({locals, totalPages}) => {
                if (locals) {
                    setDataLocals(prevLocals => [...prevLocals, ...locals]);
                    setTotalPage(totalPages);
                    setFoundLocals(true);
                }
            }
        ).catch(
            (result) => {
                setFoundLocals(false);
            }
        ).finally(
            () => {
                setPage( page + 1);
                setLoading(false);
            }
        )
    }*/

    const fetchMoreLocales  = async () =>{
        try {
            if(page <= totalPage && !fetching){
                setFetching(true)    
                const {locals, totalPages} = await fetchData(latitude, longitude, kilometers, ['.*'], page);
                if (locals) {
                    setDataLocals([...dataLocals, ...locals]);
                    setTotalPage(totalPages);
                    setFetching(false);
                    setLoading(false); 

                    if (locals.length === 0) {
                        setNoLocalsFound(true);
                    }
                }
                setPage(page + 1);
            }      
        } catch (error) {
            console.error('Error fetching locales:', error);
        }
    }

    useEffect(() => {
        setPage(1);
        setTotalPage(1);
        setDataLocals([]);
        setLoading(true);
        setNoLocalsFound(false); 
    },[kilometers]);

    const dataRange = () => {
        if(kilometers >= 1){
            return (kilometers) + 'Km';
        }else{
            return (kilometers * 1000) + 'M'
        }
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                updateDataStyles(1); 
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                updateDataStyles(0.5); 
            }
        );
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <>
        <KeyboardAvoidingView style={{ flex: 1 }}>
        {noLocalsFound ? (
            <ThereAreNoLocals
                text={'No se ha encontrado ningún local'}
                information={'Al parecer no se pudo encontrar ningún local en el rango de'}
                range={dataRange().toString()}
            />
        ):(
            <View style={styles.container}>
                <FlatList
                    keyboardShouldPersistTaps='always'
                    numColumns={2}
                    data={dataLocals}
                    initialNumToRender={4}
                    refreshing={loading}
                    renderItem={({ item }) => {
                        return (
                            <CardCloseToMe 
                                Img={item ? item.uriImage :'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} 
                                like={false} 
                                Name={item.name} 
                                categories={item.tags[0]}
                                navigation={navigation}
                                id={item._id}
                            />
                        );
                    } }
                    keyExtractor={(item) => item._id }
                    onEndReached={fetchMoreLocales}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={() => (
                        loading ? <ActivityIndicator size="large" color={Colors.orange} /> : null
                )} />
            </View>

        )}
        </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
});
