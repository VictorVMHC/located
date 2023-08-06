import React from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { local } from '../Utils/Data _Example'
import { Card } from '../Components/Card'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

interface Props extends NativeStackScreenProps<any, any>{};

export const PopularView = ({navigation}:Props) => {
    const id = navigation.getState();

    useFocusEffect(() => {
        console.log('popular focused');
    });
  
    console.log(id);
    console.log(id.history);
    console.log(id.key);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={local}
                renderItem={ ( { item } ) => {
                    return(
                        <Card like={false} local={item} 
                            routeToStore={() => navigation.navigate("StoreView")}
                        />
                    )
                } }
                keyExtractor={(item) => item.id.toString()}
            />
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
    title: {
        fontSize: 32,
    },
});