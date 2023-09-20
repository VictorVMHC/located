import { GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { IconWithText } from '../Components/IconWithText';
import { LoadingOverlay } from '../Components/LoadingOverlay';
import { AuthContext } from '../Context/AuthContext';
import { logInData } from '../Interfaces/UserInterface';
import { Colors, FontStyles, Styles } from '../Themes/Styles';
import { handleGoogleSignInErrors } from '../Utils/HandleUser';

interface Props extends NativeStackScreenProps<any, any>{};

export const LoginToAccessView = ({navigation}: Props) => {
    const { t } = useTranslation();
    const { signIn, errorMessage, removeError, status, googleSignIn } = useContext( AuthContext );

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

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('ValidEmail').toString()).required(t('RequireField').toString()),
        password: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),  
    });

    GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
    });
    
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

    return (
        <SafeAreaView  style={StylesLogInAccess.container}>
            {status === 'checking' && <LoadingOverlay/> }
            <ScrollView>
            <View style={StylesLogInAccess.containerView}>
                    <Text style={StylesLogInAccess.txtTitle}>{t('LoginToAccessLogText')}</Text>
                    <Text style={StylesLogInAccess.text}>{t('LoginToAccessTextInfo')}</Text>
                <View>
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
                                        style={[StylesLogInAccess.input, errors.email ? StylesLogInAccess.addProperty : null, FontStyles.SubTitles]}
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
                                        style={[StylesLogInAccess.input, errors.password ? StylesLogInAccess.addProperty : null, FontStyles.SubTitles]}
                                        placeholderTextColor={Colors.blueText}
                                        placeholder={`${t('Password')}`}
                                        secureTextEntry
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                    />
                                    {errors.password && 
                                        <IconWithText 
                                            NameIcon='exclamation-circle' 
                                            text={errors.password} 
                                            ColorIcon={Colors.Yellow} 
                                            IconSize={15} 
                                            textStyle={{color: Colors.Yellow}}
                                        />}
                                    <View>
                                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordView")} >
                                            <Text style={StylesLogInAccess.txtInformation}>{t('ForgotPassword')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{...Styles.boton, borderRadius:12}} 
                                        onPress={handleSubmit}>
                                                <Text style={{...Styles.txtBtn,top:1}}>{t('LOG')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View>
                        <View style={StylesLogInAccess.line}>
                            <View style={StylesLogInAccess.viewLine}></View>
                                <View style={StylesLogInAccess.viewTextInLine}>
                                    <Text style={StylesLogInAccess.textLogIn}>{t('OrLogWith')}</Text>
                                </View>
                                <View style={StylesLogInAccess.viewLine}></View>
                        </View>
                        <View style={StylesLogInAccess.containerIcons}>
                            <GoogleSigninButton
                                onPress={handleGoogleSingIn}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                            <Text style={StylesLogInAccess.txt}>{t('NoSingUp')}</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("MainCreateAccountView")}>
                                    <Text style={{...FontStyles.Information, color: 'black',fontSize:17,textAlign:'center'}}>{t('CreateAccount')}</Text>
                            </TouchableOpacity>
                        </View> 
                </View>
            </ScrollView>
        </SafeAreaView>    
    )
}

const StylesLogInAccess = StyleSheet.create({
    container:{
        flex:2,
        alignItems:'center',
        padding: 10,
    },
    containerView:{
        flex:2,
        padding:12,
        borderRadius:10,
        borderWidth:2,
        borderColor:'gray',
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'#fff8e7',
    },
    txtTitle:{
        ...FontStyles.Title,
        top:-15,
        textAlign:'center',
    },
    text:{
        ...FontStyles.Text,
        textAlign:'left',
        right:3,
        top:-5,
    },
    txt:{
        ...FontStyles.Information,
        fontSize:16,
    },
    txtInformation:{
        ...FontStyles.Information,
        alignSelf:'flex-end',
        fontSize:18,
        top:-13,
        left:4,
        padding:8,
    },
    textLogIn:{
        ...FontStyles.Information,
        top:-1,
        width:200,
        textAlign:'center',
        fontSize:19.5,
    },
    input:{
        height: 48,
        width: 300,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        textAlign: 'left',
        marginVertical: 5,
        paddingLeft: 10,
        padding:10,
    },
    viewLine:{
        flex:2.5,
        borderColor: 'gray',
        borderWidth: 1,
        height:1,
        top:5,
    },
    line:{
        flexDirection: 'row', 
        width: 290,
        left:5,
        marginVertical: 20,
    },
    viewTextInLine:{
        flex: 4,
        top: -6,
        alignItems: 'center',
    },
    containerIcons:{
        justifyContent: 'center',
        flexDirection: 'row',
        padding:5, 
        alignItems:'center',
        width: 300, 
        alignContent: 'space-around', 
        marginBottom: '4%',
    },
    btnIcon:{
        marginHorizontal: 10,
        width: 75,
        height:60,
        left:3,
        backgroundColor:'white',
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
        fontSize: 45,
        marginTop: 4
    },
    IconGoogle:{
        color:'red',
        fontSize: 45,
        marginTop: 4
    },
    IconApple:{
        color:'black',
        fontSize: 45,
        marginTop: 2,
    },
    addProperty: {
        borderColor: Colors.Yellow
    }
});
