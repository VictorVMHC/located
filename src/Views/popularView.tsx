import React from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { local } from '../Utils/Data _Example'
import { Card } from '../Components/Card'



export const PopularView = () => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={local}
                renderItem={ ( { item } ) => {return(<Card like={false} local={item}/>)} }
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