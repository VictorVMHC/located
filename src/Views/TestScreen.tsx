import React from 'react'
import { Text, View } from 'react-native'
import { Card } from '../Components/Card'
import { CardAcordeon } from '../Components/CardAcordeon'

export const TestScreen = () => {
    const local = {
    name: 'hola',
    adress: 'hola',
    uriImage: 'https://www.creaxid.com.mx/blog/wp-content/uploads/2017/12/Local-Marketing.jpg',
    isVerify: true,
    schedules: 
    [
        {
            day1: 'hola',
            day2: 'hola',
            open: 'hola',
            close: 'hola',
        },
        {
            day1: 'hola',
            day2: '',
            open: 'hola',
            close: 'hola',
        },
        {
            day1: 'hola',
            day2: 'hola',
            open: 'hola',
            close: 'hola',
        }
    ],
    rate: 10,
    quantityRate: 10,
    tags: ['hola','hola','hola','hola']
    }
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Card local={local} cardWidth={0} cardHeight={0} like={false}/>
        </View>
    )
}
