import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { local } from '../Utils/Data _Example';
import { Local } from '../Interfaces/DbInterfaces';
import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types';
import { Text } from 'react-native-paper';


export const CarouselComponent = () => {
    const { width, height} = useWindowDimensions();
    return (
        <View style={{position: "absolute", width, height: height/4, bottom:0, borderTopEndRadius: 15, borderTopStartRadius: 15, backgroundColor: "red" }}>
            <Carousel
                loop
                width={width}
                height={height/4}
                data={local}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <Text style={{color:"black", }} >
                            {JSON.stringify(item)}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}
