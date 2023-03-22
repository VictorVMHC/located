import { View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


interface Props{
    text:string,
    onPress?:() =>void,
    iconName: string,
}

const DrawerMenuButtons = ({text='', onPress, iconName=''}:Props) => {
return (
    <TouchableOpacity
        style={styles.botoncontainer}
        onPress={ onPress }
    >
    <View style={{flex:2}}><Icon name={iconName} size={30} color="white"/></View>
    <View style={{flex:6}}><Text style={styles.text}>{ text }</Text></View>
    <View style={{flex:2}}><Icon name="chevron-forward-outline" size={20} color="white" style={{ marginStart: 30 }}/></View>
    </TouchableOpacity>
)
}

const styles= StyleSheet.create({
    botoncontainer:{
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
    Iconflecha:{

    }
});




export default DrawerMenuButtons