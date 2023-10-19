import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {Text, View } from 'react-native'

interface Props extends NativeStackScreenProps<any, any> {};

export const ForYouView = ({ navigation }: Props) => {

    return (
        <View style={{ flex: 1 }}>
            <Text>For You View</Text> 
        </View>
    )
}