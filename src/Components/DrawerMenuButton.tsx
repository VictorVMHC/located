import { View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


interface Props{
    text:string,
    style?: {},
    iconColor?: string,
    onPress?:() =>void,
    iconName: string,
}

export const DrawerMenuButtons = ({text='', onPress, iconName='', style, iconColor}:Props) => {
return (
    <TouchableOpacity
        style={styles.buttonContainer}
        onPress={ onPress }
    >
        <View style={{flex:2}}><Icon name={iconName} size={30} color={iconColor ? iconColor : 'white' }/></View>
        <View style={{flex:6}}><Text style={{...styles.text, ...style}}>{ text }</Text></View>
        <View style={{flex:2}}><Icon name="chevron-forward-outline" size={20} color="white" style={{ marginStart: 30 }}/></View>
    </TouchableOpacity>
)
}

const styles= StyleSheet.create({
    buttonContainer:{
        top: 15,
        marginBottom:15,
        alignItems:'center',
        flexDirection: 'row',
        padding: 10,
    },
    text:{
        fontSize:18,
        marginStart: 0,
        fontWeight:'bold',
        color: 'white',
    },
});