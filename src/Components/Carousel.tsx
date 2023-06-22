import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { local } from '../Utils/Data _Example';


export const CarouselComponent = () => {
    const { width, height} = useWindowDimensions();
    return (
        <View>
            <Carousel
                loop
                width={width}
                height={height/4}
                data={local}
                renderItem={(local) => (
                    <View>
                        {JSON.stringify(local)}
                    </View>
                )}
            />
        </View>
    )
}
