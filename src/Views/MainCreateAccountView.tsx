import { GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Circles } from '../Components/Circles';
import { CustomAlert } from '../Components/CustomAlert';
import { PickerButton } from '../Components/PickerButton';
import { AuthContext } from '../Context/AuthContext';
import { FontStyles, Styles } from '../Themes/Styles';
import { handleGoogleSignInErrors } from '../Utils/HandleUser';

interface Props extends NativeStackScreenProps<any, any>{}


export const MainCreateAccountView = ({navigation}: Props) => {
    const { t, i18n } = useTranslation();
    const { googleSignUp } = useContext( AuthContext );
    const { errorMessage, removeError } =  useContext( AuthContext );

    
    GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
    });
    useEffect(() => {
        if( errorMessage.length === 0 ) return;
    
        CustomAlert({
            title:`${t('LoginAlert')}`,
            desc: errorMessage,
            action: removeError
        });
    
    }, [ errorMessage ]);

const signInGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn();

        const { user, idToken } = userInfo;

        console.log(idToken, user);
        
        if(idToken){
            await createUserWithGoogle( user, idToken);
        }

        } catch (error) {
            handleGoogleSignInErrors(error);
        }
    };

    const createUserWithGoogle = async (userData: any, idUser: string) => {
        try {
            googleSignUp(userData, idUser );
        } catch (error:any) {
            console.log('Error creating user:', error.response.data);
        }
    };

    const  signOut = async () => {
        try {
            const userInfo =  await GoogleSignin.signOut();
            console.log(userInfo);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <Circles
            position='top'
            quantity={2}
            />
            <View style={{...Styles.headerView, flexDirection: 'row'}}>
                    <View style={{flex: 6}} >
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{...Styles.textStyle, width:300, fontSize:32, top:8, left: 15}}>{t('CreateAccount')}</Text>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', left:12, top:3 }}>
                        <View style={{flex: 1.6, left:15}}>
                            {i18n.language === 'es-MX'
                                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            }
                        </View>
                        <View style={{ flex: 5}}>
                            <PickerButton/>
                        </View>   
                    </View>
                </View>
            <Image
                style={{...Styles.imageStyle, left: -120, top: -5}}
                source={require('../Assets/Images/logo_located.png')}
            />
            <View style={Styles.bodyView}>
                <View style={StylesLogIn.viewText}>
                    <TouchableOpacity onPress={signInGoogle}>
                        <AntDesign name="google"style={StylesLogIn.IconGoogle}/>
                        <Text style= {StylesLogIn.textInformation}>{t('SingUpGoogle')}</Text>
                    </TouchableOpacity>    
                    <TouchableOpacity>
                        <AntDesign name="facebook-square"style={StylesLogIn.IconFace}/>
                        <Text style= {StylesLogIn.textInformation}>{t('SingUpFacebook')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("CreateAccountEmailView")}>
                        <AntDesign name="mail"style={StylesLogIn.IconMail}/>
                        <Text style= {StylesLogIn.textInformation}>{t('SingUpEmail')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOut}>
                    <Text style= {{...StylesLogIn.textInformation, top:30}}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const StylesLogIn = StyleSheet.create({
    viewText: {
        width: 300,
    },
    textInformation:{
        alignSelf: 'flex-end',
        top: -38,
        ...FontStyles.Information,
        color:'black',
        width: 226,
        height: 23
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
    IconFace:{
        color: 'blue',
        fontSize: 35,
        top: -14,
    },
    IconMail:{
        color:'black',
        fontSize: 35,
        top: -14,
        width: 45,
        height:30,
    },
    IconGoogle:{
        color:'red',
        fontSize: 35,
        top: -14,
    },
});

