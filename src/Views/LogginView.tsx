import React from 'react';
import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'


export const LogginView = () => {
  return (
    <SafeAreaView style={Styles.container}>
        <Circles
        position='top'
        quantity={2}
        />
        <View style={Styles.headerView}>
            <Text style={Styles.textStyle}> Iniciar sesion</Text>
        </View>
        <KeyboardAvoidingView
            behavior={'height'}
            keyboardVerticalOffset={0}
            enabled={true}
            style={Styles.bodyView}
        >
                <Image
                    style={Styles.imageStyle}
                    source={require('../Assets/Images/logo_located.png')}
                />
                <TextInput style={Styles.input}
                    placeholder='Ingresa tu correo electronico'   
                />
                <TextInput style={Styles.input}
                    placeholder='Ingresa tu contraseña'   
                />
                <View style={StylesLogging.viewText}>
                    <TouchableOpacity>
                    <Text style= {StylesLogging.textInformation}>¿Olvido su contraseña?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={Styles.boton}>
                    <Text style={Styles.txtbtn}>Entrar</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', width: 300, marginVertical: 20}}>
                    <View style={StylesLogging.viewLine}></View>
                    <View style={StylesLogging.viewTextInLine}><Text style={StylesLogging.textLogging}>O entra con </Text></View>
                    <View style={StylesLogging.viewLine}></View>
                </View>
                <View style={{flexDirection: 'row', width: 300, alignContent: 'space-around', marginBottom: 20}}>
                    <TouchableOpacity style={StylesLogging.btnIcon}></TouchableOpacity>
                    <TouchableOpacity style={StylesLogging.btnIcon}></TouchableOpacity>
                    <TouchableOpacity style={StylesLogging.btnIcon}></TouchableOpacity>
                </View>
                <Text style={FontStyles.Information}>¿Aún no estas registrado? </Text>
                <TouchableOpacity>
                <Text style={{...FontStyles.SubTitles, color: 'black'}}>Crear cuenta</Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>   
            
        
    </SafeAreaView>


    
  )
}

const StylesLogging = StyleSheet.create({
    viewText: {
        width: 300,
    },
    textInformation:{
        alignSelf: 'flex-end',
        top: -4,
        ...FontStyles.Information
    },
    viewLine:{
        flex: 1.8,
        borderColor: 'gray',
        borderWidth: 1,
        height:1,
    },
    viewTextInLine:{
        flex: 2.4,
        top: -6,
        alignItems: 'center',
    },
    textLogging:{
        ...FontStyles.Information,

    },
    btnIcon:{
        marginHorizontal: 10,
        alignSelf:'baseline',
        width: 80,
        height:60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 10.00,
        elevation: 4,
        borderRadius: 5,
    }

});

