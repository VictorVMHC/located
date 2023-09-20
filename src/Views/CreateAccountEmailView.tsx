import { Formik } from 'formik';
import React, { useState, useContext, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circles } from '../Components/Circles';
import { ModalVerifyUser } from '../Components/ModalVerifyUser';
import { PickerButton } from '../Components/PickerButton';
import { Colors, FontStyles, Styles } from '../Themes/Styles';
import * as Yup from 'yup';
import { IconWithText } from '../Components/IconWithText';
import { createNewUser,  } from '../Interfaces/UserInterface';
import { VerifyEmail, VerifyCode, deleteVerifyEmail, VerifyUserInfo } from '../Api/verifyEmail';
import { AuthContext } from '../Context/AuthContext';

interface Code {
    v1: string,
    v2: string,
    v3: string,
    v4: string,
    v5: string,
    v6: string,
}

export const CreateAccountEmailView = () => {
    const userInitialValue = {
        name: "",
        email: "",
        image: "https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png",
        phone: "",
        password: "",
        username: "",
        age: null,
    }

    const {t, i18n } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [emailUser, setEmailUser] = useState('');
    const [userState, setUserState] = useState<createNewUser>(userInitialValue);
    const [attempts, setAttempts] = useState(3);
    const {signUp } = useContext(AuthContext);
    const [code, setCode] = useState<Code>({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
    const textInputRefs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
    const [errorMessage, setErrorMessages] = useState('');

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
    
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('RequireField').toString()),
        username: Yup.string().required(t('RequireField').toString()),
        email: Yup.string().email(t('ValidEmail').toString()).required(t('RequireField').toString()),
        password: Yup.string().min(6, t('PasswordValidation').toString()).required(t('RequireField').toString()),
        phone: Yup.string().required(t('RequireField').toString()).min(10,t('PhoneValidation').toString()),
        age: Yup.string().required(t('RequireField').toString()),
    });

    const updateValue = (name: string, newValue: string) => {
        setCode((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));     
    };

    const handleSubmit = async (user:createNewUser) => {
        setUserState(user);   
        try{
            const dato = await VerifyUserInfo(user);
            if(dato.status == 200){
                await VerifyEmail(user.email, i18n.language);
                setEmailUser(user.email);
                handleOpenModal();
            }
        }catch(error: any) {
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
            : 'An error occurred while verifying the user';
            
            setErrorMessages(errorMessage);
            setModalError(true);
        }
    }

    const handleOpenModal = () => {
        setCode({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
        setModalVisible(true);
    };
    
    const handleCloseModal = async () => {
        const codeConcat = concatenateValues(code);
        try{
            const verifyCode = await VerifyCode(emailUser, codeConcat);
            if(verifyCode.status == 200){
                signUp(userState)
                setModalVisible(false);
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
                    signUp(userState)
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

    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <Circles
                position='top'
                quantity={2}
                />
                <View style={StyleSingleText.contentOne}>
                    <View style={{flex:6}}>
                        <View style={StyleSingleText.containerWelcome}>
                            <Text style={{...Styles.textStyle, width:300, top:12, left:14, fontSize:33}}>{t('CreateAccount')}</Text>
                        </View>
                    </View>    
                    <View style={{...StyleSingleText.containerLang, flex:2,top:10}} >
                        <View style={{...StyleSingleText.containerImgLang, flex:2,left:10 }}>
                            {i18n.language === 'es-MX'
                                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            }
                        </View>
                        <View style={{flex:1, top:-2, left:10}}>
                            <PickerButton/>
                        </View>   
                    </View>
                </View>
                <View style={StyleSingleText.containerLogo}>
                        <Image style={{...Styles.imageStyle, top:7}} source={require('../Assets/Images/logo_located.png')} />
                </View>
                <View style={StyleSingleText.bodyView}>
                    <Text style={StyleSingleText.onlyText} adjustsFontSizeToFit>{t('PersonalInfo')}</Text>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            phone: "",
                            password: "",
                            username: "",
                            age: null,
                        }}
                        onSubmit={(User)=>{handleSubmit(User)}}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <View>
                                <TextInput 
                                    style={[Styles.input, errors.name ? StyleSingleText.addProperty : null, FontStyles.SubTitles]}
                                    placeholderTextColor={Colors.blueText}
                                    onChangeText={handleChange('name')}
                                    placeholder={`${t('Name')}`}
                                    value={values.name}
                                />
                                {errors.name && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.name} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
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
                                <TextInput 
                                    style={[Styles.input, errors.username ? StyleSingleText.addProperty : null, FontStyles.SubTitles]}
                                    placeholderTextColor={Colors.blueText}
                                    onChangeText={handleChange('username')}
                                    placeholder={`${t('UserName')}`}
                                    value={values.username}
                                />
                                {errors.username && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.username} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TextInput 
                                    style={[Styles.input, errors.password ? StyleSingleText.addProperty : null, FontStyles.SubTitles]}
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
                                <TextInput 
                                    style={[Styles.input, errors.phone ? StyleSingleText.addProperty : null, FontStyles.SubTitles]}
                                    placeholderTextColor={Colors.blueText}
                                    placeholder={`${t('PhoneNumber')}`}
                                    maxLength={12}
                                    keyboardType="phone-pad"
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                />
                                {errors.phone && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.phone} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TextInput 
                                    style={[Styles.input, errors.age ? StyleSingleText.addProperty : null, FontStyles.SubTitles]}
                                    placeholderTextColor={Colors.blueText}
                                    placeholder={`${t('Age')}`}
                                    keyboardType='number-pad'
                                    value = {values.age || ''}
                                    maxLength={3}
                                    onChangeText={handleChange('age')}
                                />
                                {errors.age && 
                                    <IconWithText 
                                        NameIcon='exclamation-circle' 
                                        text={errors.age} 
                                        ColorIcon={Colors.Yellow} 
                                        IconSize={15} 
                                        textStyle={{color: Colors.Yellow}}
                                    />}
                                <TouchableOpacity style={StyleSingleText.button}
                                    onPress={handleSubmit}
                                >
                                    <Text style={{...Styles.txtBtn, top:-1}}>{t('Registrar')}</Text>
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
    );
}

const StyleSingleText = StyleSheet.create({
    onlyText:{
        fontWeight: 'bold',
        width: 340,
        textAlign: 'center',
    },
    bodyView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'25%',
    },
    contentOne:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    containerWelcome:{
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    containerLang:{
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        width: 218,
    },
    containerImgLang:{
        width: 30, 
        height: 53, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignSelf: 'center',
        top: '8%'
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

