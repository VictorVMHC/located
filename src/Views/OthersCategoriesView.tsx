import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { CardCloseToMe } from '../Components/CardCloseToMe';
import { NewLocal } from '../Interfaces/LocalInterfaces';
import { fetchData } from '../Utils/FetchFunctions';
import { Colors } from '../Themes/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
    kilometers: number;
    latitude: number,
    longitude:number
};



export const OthersCategoriesView = ({kilometers, latitude, longitude}:Props) => {
    const [dataLocals, setDataLocals] = useState<NewLocal[]>([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const { width } = useWindowDimensions();
    const [heightContainerTexInput, setHeightContainerTexInput] = useState(0.5);
    const [foodTagsInput, setFoodTagsInput] = useState('.*');
    const [flagSearchLocal, setFlagSearchLocal] = useState(false);

    const updateDataStyles = (valueHeightContainerTexInput: number) => {
        setHeightContainerTexInput(valueHeightContainerTexInput);
    }

    const fetchDataAndUpdateLocals = async (pageToFetch: number = 1) => {
        const { locals, totalPages } = await fetchData(
            latitude, longitude, kilometers, [foodTagsInput], pageToFetch
        );
        if (locals) {
            setDataLocals(prevLocals => [...prevLocals, ...locals]);
            setTotalPage(totalPages);
        }
        setFetching(false);
        setLoading(false);
    }

    const fetchMoreLocales  = async () =>{
        console.log('otros'+ page, totalPage);
        
        if(page <= totalPage && !fetching && !flagSearchLocal){
            fetchDataAndUpdateLocals(page);
            setPage(page + 1);
        }
    }

    const handleSearch = async () => {
        setLoading(true);
        setDataLocals([]);
        setFetching(true);
        setPage(1);
        setTotalPage(1);
        fetchDataAndUpdateLocals();
        setFlagSearchLocal(true);
    }

    const handleFoodTagsInputChange = (text: string) => {
        if(text.trim() === ''){
            setFoodTagsInput('.*')
            handleSearch();
            
        }else{
            setFoodTagsInput(text);
        }
    }



    useEffect(() => {
        console.log('Entro');
        console.log('kilometers:', kilometers);
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
            <View style={{ flex: heightContainerTexInput, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <TextInput style={{backgroundColor: Colors.white ,width: '70%', height:width * 0.14, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 ,borderColor: Colors.orange, borderWidth: 3, color: Colors.black}}  onChangeText={handleFoodTagsInputChange}  >
                </TextInput>
                <TouchableOpacity onPress={handleSearch} style={{backgroundColor: Colors.orange,width: '100%', height: width * 0.14, justifyContent: 'center' ,borderTopRightRadius: 15, borderBottomRightRadius: 15, paddingHorizontal: 5}}>
                    <Text style={{ color: Colors.white, fontSize: 20 }}>BUSCAR</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlatList
                    keyboardShouldPersistTaps='always'
                    numColumns={2}
                    data={dataLocals}
                    renderItem={({ item }) => {
                        return (
                            <CardCloseToMe Img={'https://img.freepik.com/vector-gratis/apoye-diseno-ilustracion-negocio-local_23-2148587057.jpg?w=2000'} like={false} Name={item.name} categories={item.tags[0]} />
                        );
                    } }
                    keyExtractor={(item) => item.name.toString()}
                    onEndReached={fetchMoreLocales}
                    onEndReachedThreshold={0.1}
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
