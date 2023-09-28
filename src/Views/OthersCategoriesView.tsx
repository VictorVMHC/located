import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { fetchData } from '../Utils/FetchFunctions';
import { Colors } from '../Themes/Styles';
import { Local } from '../Interfaces/DbInterfaces';
import { useNavigation } from '@react-navigation/native';
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
    const [foodTagsInput, setFoodTagsInput] = useState('.*');
    const [ foundLocals, setFoundLocals] = useState(true);
    const navigation = useNavigation();

    const updateDataStyles = (valueHeightContainerTexInput: number) => {
        setHeightContainerTexInput(valueHeightContainerTexInput);
    }

    const fetchDataAndUpdateLocals = async (pageToFetch: number = 1) => {
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
    }

    const fetchMoreLocales  = async () =>{
        if(page <= totalPage){
            fetchDataAndUpdateLocals(page);
        }
    }

    useEffect(() => {
        setPage(1);
        setTotalPage(1);
        setDataLocals([]);
        setLoading(true);
    },[kilometers]);

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
                                Img={'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} 
                                like={false} 
                                Name={item.name} 
                                categories={item.tags[0]}
                                navigation={navigation}
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
        </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
});
