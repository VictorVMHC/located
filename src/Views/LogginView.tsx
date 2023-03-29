import React from 'react';
import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PickerButon } from '../Components/PickerButon';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any>{};

export const LogginView = ({navigation}: Props) => {
    const { i18n } = useTranslation();
    return (
        <SafeAreaView style={Styles.container}>
            <Circles
                position='top'
                quantity={2}
            />
            <View style={{...Styles.headerView, flexDirection: 'row'}}>
                <View style={{flex: 6}} >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={Styles.textStyle}> Iniciar sesion </Text>
                        <Icon name='user' size={25} light />
                    </View>
                    <Text style={FontStyles.SubTitles}>  Bienvenido!</Text>
                </View>
                <View style={{flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flex: 2}}>
                        {i18n.language === 'es'
                            ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                        }
                    </View>
                    <View style={{ flex: 8}}>
                        <PickerButon/>
                    </View>   
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={'height'}
                keyboardVerticalOffset={0}
                enabled={false}
                style={Styles.bodyView}
            >
                <Image
                    style={Styles.imageStyle}
                    source={require('../Assets/Images/logo_located.png')}
                />
                <TextInput style={Styles.input}
                placeholder='Ingrese su contraseña'   
                />
                <View style={StylesLogging.viewText}>
                    <TouchableOpacity onPress={() => navigation.navigate("OlvideContrasenaView")} >
                        <Text style= {StylesLogging.textInformation}>¿Olvido su contraseña?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={Styles.boton}onPress={ () => navigation.replace("DrawerMenu") }>
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
                <TouchableOpacity
                    onPress={() => navigation.navigate("MainCreateAccountView")}
                >
                    <Text style={{...FontStyles.SubTitles, color: 'black'}}>Crear cuenta</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>     
        </SafeAreaView>    
    )
}

const StylesLogging = StyleSheet.create({
    containerOne:{
        flex: 1,
        backgroundColor: 'orange'
    },
    containerheader:{
        flex: 1,
        backgroundColor: 'red',
    },
    containermain:{
        flex:4,
        backgroundColor: 'blue',
        alignItems: 'center'
    },
    containerLogo:{
        backgroundColor: 'pink',
    },
    CardImg:{
        width: '100%',
        height: '100%',
        resizeMode:'contain',
        borderRadius: 10
    },
    containerLogin:{

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

