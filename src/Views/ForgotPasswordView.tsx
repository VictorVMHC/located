import React, {  useRef, useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Circles } from '../Components/Circles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PickerButton } from '../Components/PickerButton';
import { Colors, Styles, FontStyles } from '../Themes/Styles'
import { IconWithText } from '../Components/IconWithText';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { VerifiedEmail,VerifyCode, deleteVerifyEmail, VerifyEmail} from '../Api/verifyEmail';
import { ModalVerifyUser } from '../Components/ModalVerifyUser';

import { StackScreenProps } from '@react-navigation/stack';
import { ViewStackParams } from '../Navigation/MainStackNavigator';

interface Code {
    v1: string,
    v2: string,
    v3: string,
    v4: string,
    v5: string,
    v6: string,
}
interface Props extends StackScreenProps<ViewStackParams, 'ForgotPasswordView'>{};

export const ForgotPasswordView = ({ navigation }: Props) => {
    const { t ,i18n } = useTranslation();
    const [code, setCode] = useState<Code>({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
    const textInputRefs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [emailUser, setEmailUser] = useState('');
    const [attempts, setAttempts] = useState(3);
    const [errorMessage, setErrorMessages] = useState('');
    

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('ValidEmail').toString()).required(t('RequireField').toString()),
    });

    const updateValue = (name: string, newValue: string) => {
        setCode((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));     
    };

    const handleTextInputChange = (index: number, text: string) => {
        const fieldName = `v${index + 1}`as keyof typeof code;
        updateValue(fieldName, text);
        if (text.length > 0 && index < textInputRefs.length - 1) {
            textInputRefs[index + 1].current?.focus();
        } 
    };
    const concatenateValues = (data: Code) => {
        const valuesArray = Object.values(data);
        const concatenatedString = valuesArray.join('');
        return concatenatedString;
    };

    const handleOpenModal = () => {
        setCode({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
        setModalVisible(true);
        console.log("open modal");
    };

    const handleCloseModal = async () => {
        const codeConcat = concatenateValues(code);
        console.log(codeConcat);
        try{
            const verifycode = await VerifyCode(emailUser,codeConcat);
            if(verifycode.status == 200){
                setModalVisible(false);
                navigation.navigate('RecoveryPasswordView' as never);
            }  
        }catch(err){
            setCode({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
            setModalVisible(false);
            setModalConfirm(true); 
        }
    };

    const handleCloseModalConfirm = async () => {
        setCode({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
        const codeConcat = concatenateValues(code)     
            try {
                const verifyCodeResponse = await VerifyCode(emailUser, codeConcat);
                setModalConfirm(false); 
                if(verifyCodeResponse.status == 200){
                    setModalConfirm(false);
                    
                }
            } catch (err) {
                setAttempts(attempts - 1);
                if(attempts === 1){
                    setAttempts(3);
                    setModalConfirm(false); 
                    await deleteVerifyEmail(emailUser);
                }
                
            }
            
    };


    const handleSubmit = async (email:string) =>{
    try{ 
        if(email){
            await VerifiedEmail(email, i18n.language);
                setEmailUser(email);
                handleOpenModal();
        }else{
            console.log('error');
        }}catch(error: any) {
            let errorMessages = [];
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                for (let i = 0; i < errors.length; i++) {
                    if (errors[i].msg) {
                        errorMessages.push(errors[i].msg);
                    }
                }
            } 
            const errorMessage = errorMessages.length > 0
            ? errorMessages.join('\n')
            : 'An error occurred while verifying the email';
            console.log(email);
            setErrorMessages(errorMessage);
            setModalError(true);
        }
    };
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <Circles
                    position='top'
                    quantity={2}
                />
                <View style={StyleSingleText.contentOne}>
                    <View style={{flex:1}}>
                        <View style={StyleSingleText.containerTitle}>
                            <Text style={{...Styles.textStyle, top:5, fontSize:34}}>{t('Passwordtitle')}</Text>
                        </View>
                    </View>    
                    <View style={StyleSingleText.containerLong} >
                        <View style={StyleSingleText.containerImgLong}>
                            {i18n.language === 'es-MX'
                                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            }
                        </View>
                        <View style={{width: 40, top:3, left:6}}>
                            <PickerButton/>
                        </View>   
                    </View>
                </View>
                <Image
                    style={{...Styles.imageStyle, left: -124, top:60}}
                    source={require('../Assets/Images/logo_located.png')}
                />
                <View style={StyleSingleText.bodyView}>
                    <Text style={StyleSingleText.onlyText}>{t('ForgotPassword')}</Text>
                    <Formik
                        initialValues={{
                            email: "",
                        }}
                        onSubmit={(Value) => {handleSubmit(Value.email)}}
                        validationSchema={validationSchema}
                    >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View>
                    <TextInput 
                        style={[Styles.input, errors.email ? StyleSingleText.addProperty : null, FontStyles.SubTitles]}
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
                    <TouchableOpacity style={{...Styles.boton,top:4, borderRadius:15, width:350}}
                        onPress={handleSubmit}
                    >
                        <Text style={{...Styles.txtBtn,top:1,}}>{t('Send')}</Text>
                    </TouchableOpacity>
                    </View>
                    )}
                    </Formik>
                </View>
                <ModalVerifyUser
                    isVisible={modalVisible}
                    closeModal={handleCloseModal}
                >
                    <View style={StyleSingleText.container}>
                        <Text style={{...StyleSingleText.texts, width:300, left:-10}}>{t('ModalMsgStart')}</Text>
                        <Text style={StyleSingleText.texts}>{t('ModalMsgCheckEmail')}</Text>
                        <Text style={{...StyleSingleText.texts,textAlign:'center', top:15}}>{t('ModalEnterCodeMsg')}</Text> 
                        <View style={StyleSingleText.row}>
                            {textInputRefs.map((ref, index) => (
                                <TextInput
                                    key={index}
                                    ref={ref}
                                    style={StyleSingleText.internText}
                                    placeholder="__"
                                    value={code[`v${index + 1}` as keyof typeof code]}
                                    onChangeText={(text) => handleTextInputChange(index, text)}
                                    maxLength={1}
                                    keyboardType="phone-pad"
                                />
                            ))}
                        </View>
                        <TouchableOpacity style={{...StyleSingleText.button,top:55}}
                            onPress={handleCloseModal}>
                            <Text style={{...Styles.txtBtn,top:-1}}>{t('ModalBtnVerify')}</Text>
                        </TouchableOpacity>
                    </View>
                </ModalVerifyUser>

                <ModalVerifyUser
                    isVisible={modalConfirm}
                    closeModal={handleCloseModalConfirm}
                >
                    <View style={StyleSingleText.container}>
                        <Text style={{...StyleSingleText.fail, top:15}}>{t('ModalEnterCodeMsgFail')}</Text> 
                        <View style={StyleSingleText.row}>
                            {textInputRefs.map((ref, index) => (
                                <TextInput
                                    key={index}
                                    ref={ref}
                                    style={StyleSingleText.internText}
                                    placeholder="__"
                                    value={code[`v${index + 1}` as keyof typeof code]}
                                    onChangeText={(text) => handleTextInputChange(index, text)}
                                    maxLength={1}
                                    keyboardType="phone-pad"
                                />
                            ))}
                        </View>
                        <TouchableOpacity style={{...StyleSingleText.button,top:60}}
                            onPress={handleCloseModalConfirm}>
                                <Text style={{...Styles.txtBtn, top:-1}}>{t('ModalBtnVerify')}</Text>
                        </TouchableOpacity>
                        <View style={{width: '100%', height: 50, marginTop: '25%'}}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', color: Colors.blueText}}>{t('attemptsVerification') +'  ' + attempts}</Text>
                        </View>
                    </View>
                </ModalVerifyUser>

                <ModalVerifyUser
                    isVisible={modalError}
                    closeModal={()=>{}}
                >
                    <View style={StyleSingleText.container}>
                        <View style={{flex:4}}>
                            <ScrollView showsVerticalScrollIndicator={true}>
                                <Text style={{fontSize: 17, color: 'black', textAlign: 'left' }}>{errorMessage}</Text>
                            </ScrollView>
                        </View>
                        <View style={{flex:1,}}>
                            <TouchableOpacity style={StyleSingleText.button} onPress={()=>setModalError(false)}>
                                <Text style={{...Styles.txtBtn, top: -1}}>{t('buttonGoBack')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalVerifyUser>

            </ScrollView>
        </SafeAreaView> 
    )
}

const StyleSingleText = StyleSheet.create({
    onlyText:{
        ...Styles.textos,
        width:'92%',
        color:'#4E7098',
        fontSize:23,
    },
    bodyView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:90,
    },
    contentOne:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    containerTitle:{
        width:'130%',
        left:10,
    },
    containerLong:{
        flexDirection: 'row', 
        justifyContent: 'flex-end',
    },
    containerImgLong:{
        top:2, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    container:{
        width: 320,
        height: 280,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -160 }, { translateY: -140 }], 
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        padding: 20,
    },
    row:{
        flexDirection:'row',
        flexWrap:'wrap',
        top: 30,
    },
    internText:{
        left: 10,
        height: 40,
        width: 45,
        color:'blue',
        padding:10,
    },
    texts:{
        color:'blue',
        fontSize:20,
        fontFamily:'bold',
        textAlign:'center',
    },
    button:{
        ...Styles.boton,
        alignSelf: 'center',
        borderRadius:12,
        top:5,
        marginBottom: 20
    },
    fail:{
        color:'red',
        fontSize:21,
        fontFamily:'bold',
        textAlign:'center',  
    },
    addProperty: {
        borderColor: Colors.Yellow
    }
});