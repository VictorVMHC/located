import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image, StyleSheet, Text } from 'react-native';

interface Props {
    uri:string,
    name: string
    containerStyle: {},
    titleStyles: {},
    imageStyle?: {},
    Action: () => void    
}
export const CardLocalView = ({uri, name, containerStyle, titleStyles, imageStyle, Action}: Props) => {
    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={() => {
                Action();
            }}
        >
            <Image
                style={{ ...styles.cardImage, ...imageStyle}}
                source={{ uri }}
            />
            <Text style={titleStyles} adjustsFontSizeToFit >{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
})
