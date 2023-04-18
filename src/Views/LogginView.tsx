import React from 'react';
import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Circles } from '../Components/Circles';
import { FontStyles, Styles } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PickerButon } from '../Components/PickerButton';
import AntDisign from 'react-native-vector-icons/AntDesign';

interface Props extends NativeStackScreenProps<any, any>{};

export const LogginView = ({navigation}: Props) => {

    const { t, i18n } = useTranslation();

    return (
        <SafeAreaView style={Styles.container}>
                <ScrollView >
                    <View style={{flex:1}}>
                        <Circles
                            position='top'
                            quantity={2}
                        />
                            <View style={StylesLogging.contentOne}>
                                <View style={{}}>
                                    <View style={StylesLogging.containerBienvenido}>
                                        <Text style={{...Styles.textStyle,}}> Iniciar sesion </Text>
                                            <Icon style={StylesLogging.iconBienvenido} name='user' size={25} brand />
                                    </View>
                                        <View>
                                            <Text style={FontStyles.SubTitles}> Bienvenido!</Text>
                                        </View>
                                </View>    
                                <View style={StylesLogging.containerLeng} >
                                    <View style={StylesLogging.containerImgLeng}>
                                        {i18n.language === 'es'
                                            ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                            :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                        }
                                    </View>
                                    <View style={{paddingLeft: 1, width: 100}}>
                                        <PickerButon/>
                                    </View>   
                                </View>
                            </View>
                            <View style={StylesLogging.containerLogo}>
                                <Image style={Styles.imageStyle} source={require('../Assets/Images/logo_located.png')} />
                            </View>
                            <View style={StylesLogging.containerInput}>
                                <TextInput style={Styles.input}
                                    placeholder='Ingresa tu correo electronico'   
                                />
                                <TextInput style={Styles.input}
                                    placeholder='Ingrese su contraseña'   
                                />
                            </View>
                            <View style={StylesLogging.viewText}>
                                <TouchableOpacity onPress={() => navigation.navigate("OlvideContrasenaView")} >
                                    <Text style= {StylesLogging.textInformation}>¿Olvido su contraseña?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={StylesLogging.containerButton}>
                                <TouchableOpacity style={Styles.boton}onPress={ () => navigation.replace("DrawerMenu") }>
                                        <Text style={Styles.txtbtn}>Entrar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={StylesLogging.containerB}>
                                <View style={StylesLogging.line}>
                                    <View style={StylesLogging.viewLine}></View>
                                        <View style={StylesLogging.viewTextInLine}>
                                            <Text style={StylesLogging.textLogging}>O entra con </Text>
                                        </View>
                                        <View style={StylesLogging.viewLine}></View>
                                </View>
                                <View style={StylesLogging.containerIcons}>
                                    <TouchableOpacity style={StylesLogging.btnIcon}>
                                        <AntDisign name="google"style={StylesLogging.IconGoogle}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity  style={StylesLogging.btnIcon}>
                                        <AntDisign name="facebook-square"style={StylesLogging.Iconface}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={StylesLogging.btnIcon}>
                                        <AntDisign name="apple1"style={StylesLogging.Iconapplel}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={FontStyles.Information}>¿Aún no estas registrado? </Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("MainCreateAccountView")}>
                                            <Text style={{...FontStyles.Information, color: 'black'}}>Crear cuenta</Text>
                                    </TouchableOpacity>
                                </View>       
                            </View>
                    </View>
                </ScrollView>
        </SafeAreaView>    
    )
}

const StylesLogging = StyleSheet.create({
    contentOne:{
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    containerBienvenido:{
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    iconBienvenido:{
        position: 'absolute', 
        top: 8, 
        left: 195
    },
    containerLeng:{
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    containerImgLeng:{
        width: 53, 
        height: 53, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignItems: 'center', 
        top: '8%'
    },
    containerInput:{
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '25%'
    },
    containerButton:{
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: '10%'
    },
    containerB:{
        alignItems: 'center', 
        marginTop: '1%'
    },
    line:{
        flexDirection: 'row', 
        width: 300,
        marginVertical: 20
    },
    containerIcons:{
        flexDirection: 'row', 
        width: 300, 
        alignContent: 'space-around', 
        marginBottom: '8%'
    },
    viewText: {
        justifyContent: 'flex-end',
        marginRight: '7%',
        top: '-3%'
    },
    textInformation:{
        alignSelf: 'flex-end',
        top: 20,
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
        justifyContent: 'center', 
        alignItems: 'center'
    },
    Iconface:{
    color: 'blue',
    fontSize: 35,
    marginTop: 10
    },
    IconGoogle:{
    color:'red',
    fontSize: 35,
    marginTop: 10
    },
    Iconapplel:{
    color:'black',
    fontSize: 35,
    marginTop: 10
    }
});
