import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

interface Props{
    NameIcon: string,
    IconSize: number,
    ColorIcon: string,
    text?: string,

}

export const IconWithText = ({NameIcon,IconSize,ColorIcon,text}: Props) => {
    return (
        <View style={styleIconWithText.container}>
            <Ionicons name={NameIcon} size={IconSize} color={ColorIcon} />
                <Text style={styleIconWithText.text}>
                    {text}
                </Text>
        </View>
    )
}

const styleIconWithText = StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    text:{
        marginHorizontal: 5
    }
});
