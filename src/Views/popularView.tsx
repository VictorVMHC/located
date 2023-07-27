import React from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { local } from '../Utils/Data _Example'
import { Card } from '../Components/Card'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any>{};

export const PopularView = ({navigation}:Props) => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={local}
                renderItem={ ( { item } ) => {return(<Card like={false} local={item} routeToStore={() => navigation.navigate("StoreView")}/>)} }
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