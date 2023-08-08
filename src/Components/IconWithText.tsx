import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props{
    NameIcon: string,
    IconSize?: number,
    ColorIcon: string,
    text?: string,
    textStyle?: {}
}

export const IconWithText = ({ NameIcon, IconSize=10, ColorIcon, text, textStyle }: Props) => {
    const {height, width} = useWindowDimensions();
    return (
        <View style={styleIconWithText.container}>
            <Icon name={NameIcon} size={IconSize} color={ColorIcon} />
                <Text style={{...styleIconWithText.text, ...textStyle, marginHorizontal: height * 0.012 }}>
                    {text}
                </Text>
        </View>
    )
}

const styleIconWithText = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    text:{
        color: 'black'
    }
});
