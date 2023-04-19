import React from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { local } from '../Utils/Data _Example'
import { Card } from '../Components/Card'

export const PopularView = () => {
    return (
        <SafeAreaView>
            <FlatList
                data={local}
                renderItem={(item) => <Card like={false} local={item.item}></Card>}
            />
        </SafeAreaView>
    )
}