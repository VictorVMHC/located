import { GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';

import { Circles } from '../Components/Circles';
import { IconWithText } from '../Components/IconWithText';
import { LoadingOverlay } from '../Components/LoadingOverlay';
import { PickerButton } from '../Components/PickerButton';
import { AuthContext } from '../Context/AuthContext';
import { logInData } from '../Interfaces/UserInterface';
import { Colors, FontStyles, Styles } from '../Themes/Styles';
import { handleGoogleSignInErrors } from '../Utils/HandleUser';

interface Props extends NativeStackScreenProps<any, any>{};

export const LoginView = ({navigation}: Props) =>{
    const { t, i18n } = useTranslation();

    const { signIn, errorMessage, removeError, status, googleSignIn } = useContext( AuthContext );

    GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
    });

    useEffect(() => {
        if( errorMessage.length === 0 ) return;

        Alert.alert( t('LoginAlert'), errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ]);

    const handleSubmit = async (loginData: logInData) => {
        signIn(loginData)   
    }

    const handleGoogleSingIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();
            const { user, idToken } = userInfo;
            const {email} = user;
                
            if(idToken){
                googleSignIn( email, idToken);
            }
    
        } catch (error) {
            handleGoogleSignInErrors(error);
        }
    } 

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('ValidEmail').toString()).required(t('RequireField').toString()),
        password: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),  
    });

    return (
        <SafeAreaView style={Styles.container}>
            {status === 'checking' && <LoadingOverlay/> }
            <ScrollView>
                <View style={{flex:1}}>
                    <Circles
                        position='top'
                        quantity={2}
                    />
                    <View style={StylesLogIn.contentOne}>
                        <View style={{}}>
                            <View style={StylesLogIn.containerWelcome}>
                                <Text style={{...Styles.textStyle, top:4, left:12, fontSize:30}}>{t('Loggin')}</Text>
                                <Icon style={StylesLogIn.iconWelcome} name='user' size={25} brand color={Colors.black}/>
                            </View>
                                <View>
                                    <Text style={{...FontStyles.SubTitles,left:12}}>{t('Welcome')}</Text>
                                </View>
                        </View>    
                        <View style={{...StylesLogIn.containerLong}} >
                            <View style={{...StylesLogIn.containerImgLong, left:20}}>
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
                    <View style={StylesLogIn.containerLogo}>
                        <Image style={{...Styles.imageStyle, top:7}} source={require('../Assets/Images/logo_located.png')} />
                    </View>
                    <View style={StylesLogIn.containerInput}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ handleChange, handleSubmit, values, errors }) => (
                                <View>
                                    <TextInput 
                                        style={[Styles.input, errors.email ? StylesLogIn.addProperty : null, FontStyles.SubTitles]}
                                        placeholderTextColor={Colors.blueText}
                                        placeholder={`${t('Email')}`}
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                    />
                                    {errors.email && 
                                        <IconWithText 
                                            NameIcon='exclamation-circle' 
                                            text={errors.email} 
                                            ColorIcon={Colors.Yellow} 
                                            IconSize={15} 
                                            textStyle={{color: Colors.Yellow}}
                                        />}
                                    <TextInput 
                                        style={[Styles.input, errors.password ? StylesLogIn.addProperty : null, FontStyles.SubTitles]}
                                        placeholderTextColor={Colors.blueText}
                                        placeholder={`${t('Password')}`}
                                        secureTextEntry
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onEndEditing={handleSubmit}
                                    />
                                    {errors.password && 
                                        <IconWithText 
                                            NameIcon='exclamation-circle' 
                                            text={errors.password} 
                                            ColorIcon={Colors.Yellow} 
                                            IconSize={15} 
                                            textStyle={{color: Colors.Yellow}}
                                        />}
                                    <View style={StylesLogIn.viewText}>
                                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordView")} >
                                            <Text style= {StylesLogIn.textInformation}>{t('ForgotPassword')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={StylesLogIn.containerButton}>
                                        <TouchableOpacity style={{...Styles.boton, borderRadius:12}} 
                                        onPress={handleSubmit}>
                                                <Text style={{...Styles.txtBtn,top:1}}>{t('LOG')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View style={StylesLogIn.containerB}>
                        <View style={StylesLogIn.line}>
                            <View style={StylesLogIn.viewLine}></View>
                                <View style={StylesLogIn.viewTextInLine}>
                                    <Text style={StylesLogIn.textLogIn}>{t('OrLogWith')}</Text>
                                </View>
                                <View style={StylesLogIn.viewLine}></View>
                        </View>
                        <View style={StylesLogIn.containerIcons}>
                            <GoogleSigninButton
                                onPress={handleGoogleSingIn}
                            />
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

const StylesLogIn = StyleSheet.create({
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
        alignContent: 'space-around', 
        marginBottom: '8%'
    },
    viewText: {
        justifyContent: 'flex-end',

        top: '-10%'
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
    textLogIn:{
        ...FontStyles.Information,
        top:-1,
        width:200,
        textAlign:'center'

    },
    btnIcon:{
        flex: 1,
        alignContent: 'center',
        paddingVertical: 20,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1,
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    IconGoogle:{
        color:'red',
        fontSize: 35,
    },
    addProperty: {
        borderColor: Colors.Yellow
    }
});
