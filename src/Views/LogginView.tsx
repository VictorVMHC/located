import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Circles } from '../Components/Circles';
import { PickerButton } from '../Components/PickerButton';
import { Colors, FontStyles, Styles } from '../Themes/Styles';

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
                                <View style={StylesLogging.containerWelcome}>
                                    <Text style={{...Styles.textStyle, top:4, left:12, fontSize:30}}>{t('Loggin')}</Text>
                                        <Icon style={StylesLogging.iconWelcome} name='user' size={25} brand />
                                </View>
                                    <View>
                                        <Text style={{...FontStyles.SubTitles,left:12}}>{t('Welcome')}</Text>
                                    </View>
                            </View>    
                            <View style={{...StylesLogging.containerLong}} >
                                <View style={{...StylesLogging.containerImgLong, left:20}}>
                                    {i18n.language === 'es-MX'
                                        ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                        :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                    }
                                </View>
                                <View style={{flex:1,top:-3}}>
                                    <PickerButton/>
                                </View>   
                            </View>
                        </View>
                        <View style={StylesLogging.containerLogo}>
                            <Image style={{...Styles.imageStyle, top:7}} source={require('../Assets/Images/logo_located.png')} />
                        </View>
                        <View style={StylesLogging.containerInput}>
                            <TextInput 
                                style={[Styles.input, FontStyles.SubTitles]}
                                placeholderTextColor={Colors.blueText}
                                placeholder={`${t('PlaceHoldEnterEmail')}`} 
                            />
                            <TextInput 
                                style={[Styles.input, FontStyles.SubTitles]}
                                placeholderTextColor={Colors.blueText}
                                placeholder={`${t('PlaceHoldEnterPassword')}`}  
                            />
                        </View>
                        <View style={StylesLogging.viewText}>
                            <TouchableOpacity onPress={() => navigation.navigate("OlvideContrasenaView")} >
                                <Text style= {StylesLogging.textInformation}>{t('ForgotPassword')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={StylesLogging.containerButton}>
                            <TouchableOpacity style={{...Styles.boton, borderRadius:12}}onPress={ () => navigation.replace("DrawerMenu") }>
                                    <Text style={{...Styles.txtBtn,top:1}}>{t('LOG')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={StylesLogging.containerB}>
                            <View style={StylesLogging.line}>
                                <View style={StylesLogging.viewLine}></View>
                                    <View style={StylesLogging.viewTextInLine}>
                                        <Text style={StylesLogging.textLogging}>{t('OrLogWith')}</Text>
                                    </View>
                                    <View style={StylesLogging.viewLine}></View>
                            </View>
                            <View style={StylesLogging.containerIcons}>
                                <TouchableOpacity style={StylesLogging.btnIcon}>
                                    <AntDesign name="google"style={StylesLogging.IconGoogle}/>
                                </TouchableOpacity>
                                <TouchableOpacity  style={StylesLogging.btnIcon}>
                                    <AntDesign name="facebook-square"style={StylesLogging.IconFace}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={StylesLogging.btnIcon}>
                                    <AntDesign name="apple1"style={StylesLogging.IconApple}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{...FontStyles.Information, left:5,width:239, fontSize:18.5,textAlign:'center'}}>{t('NoSingUp')}</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("MainCreateAccountView")}>
                                        <Text style={{...FontStyles.Information, color: 'black', width:130, left:-13,fontSize:17.5,textAlign:'center'}}>{t('CreateAccount')}</Text>
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
    containerWelcome:{
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    iconWelcome:{
        top: 14, 
        left:22,
        alignItems:'center',
    },
    containerLong:{
        flexDirection: 'row', 
        width: 100,
        left:10
    },
    containerImgLong:{
        width: 30, 
        height: 53, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignItems: 'center', 
        top: 30,
    },
    containerInput:{
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '25%',
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
        top:5,
    },
    viewTextInLine:{
        flex: 4,
        top: -6,
        alignItems: 'center',
    },
    textLogging:{
        ...FontStyles.Information,
        top:-1,
        width:200,
        textAlign:'center'

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
    IconFace:{
    color: 'blue',
    fontSize: 35,
    marginTop: 10
    },
    IconGoogle:{
    color:'red',
    fontSize: 35,
    marginTop: 10
    },
    IconApple:{
    color:'black',
    fontSize: 35,
    marginTop: 10
    }
});
