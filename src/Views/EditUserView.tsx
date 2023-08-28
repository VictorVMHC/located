import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;

export const EditUserView = () => {
    return (
        <View style={StyleEditUser.container}>
            <View style={StyleEditUser.topContainer}>
                <View style={StyleEditUser.containerImgEdit}>
                        <View style={StyleEditUser.containerImg}>
                            <Image
                                style={StyleEditUser.img}
                                source={require('../Assets/Images/Lisa.png')}
                            />
                        </View>
                            <TouchableHighlight  style={StyleEditUser.containerEditIcon} underlayColor="lightgray" onPress={()=>console.log('hola')}>
                                <Icon name='pen' size={20} color="black" light/>
                            </TouchableHighlight>
                </View>
            </View>
            <View style={StyleEditUser.centerContainer}>
                <View style={StyleEditUser.containerTextInput}>
                    <Text style={StyleEditUser.text}>Name</Text>
                    <TextInput style={StyleEditUser.textInput}></TextInput>
                </View>
                <View style={StyleEditUser.containerTextInput}>
                    <Text style={StyleEditUser.text}>User Name</Text>
                    <TextInput style={StyleEditUser.textInput}></TextInput>
                </View>
                <View style={StyleEditUser.containerTextInput}>
                    <Text style={StyleEditUser.text}>Email</Text>
                    <TextInput style={StyleEditUser.textInput}></TextInput>
                </View>
                <View style={StyleEditUser.containerTextInput}>
                    <Text style={StyleEditUser.text}>Telefono</Text>
                    <TextInput style={StyleEditUser.textInput}></TextInput>
                </View>
                <View style={StyleEditUser.containerTextInput}>
                    <Text style={StyleEditUser.text}>Edad</Text>
                    <TextInput style={StyleEditUser.textInput}></TextInput>
                </View>
            </View>
            <View style={StyleEditUser.bottomContainer}>
                <TouchableHighlight style={StyleEditUser.button} underlayColor= 'rgba(255,198,0,1)' onPress={()=>console.log('hola')}>
                    <Text style={StyleEditUser.textButton}>Actualizar</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const StyleEditUser = StyleSheet.create({
    container:{
        flex:1,
    },
    topContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer:{
        flex:2.5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bottomContainer:{
        flex:0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerImgEdit:{
        width: windowWidth * 0.33, 
        height: windowWidth * 0.33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerEditIcon:{
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: windowWidth * 0.12 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.94)',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: windowWidth * 0.01,
        right: windowWidth * 0.01,
        
    },
    containerImg:{
        width: windowWidth * 0.32, 
        height: windowWidth * 0.32,
        borderRadius: (windowWidth * 0.4) / 2, 
        overflow: 'hidden', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    img:{
        flex: 1,
        resizeMode: 'contain'
    },
    containerTextInput:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.20,
        justifyContent: 'flex-end'
    },
    text:{
        fontFamily: 'Outfit.Regular',
        fontSize: 23,
        color: 'black'
    },
    textInput:{
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderRadius: 7
    },
    button:{
        width: windowWidth * 0.85,
        height: windowWidth * 0.13,
        backgroundColor: 'black',
        justifyContent: 'center',
        borderRadius: 11
    },
    textButton:{
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Outfit.SemiBold',
        fontSize: 23
    }
});
