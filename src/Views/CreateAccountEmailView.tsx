import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circles } from '../Components/Circles';
import { ModalVerifyUser } from '../Components/ModalVerifyUser';
import { PickerButton } from '../Components/PickerButton';
import { Colors, FontStyles, Styles } from '../Themes/Styles';
import * as Yup from 'yup';
import { IconWithText } from '../Components/IconWithText';
import { User } from '../Interfaces/UserInterfaces';
import { VerifyEmail } from '../Api/verifyEmail';

interface Code {
    v1: string,
    v2: string,
    v3: string,
    v4: string,
    v5: string,
    v6: string,
}

export const CreateAccountEmailView = () => {
    const {t, i18n } = useTranslation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);

    const [code, setCode] = useState<Code>({v1: '', v2: '', v3: '', v4: '', v5: '', v6: ''});
    
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
        console.log(code);
        
    };

    const handleSubmit = async ({email=''}:User) => {
        console.log(JSON.stringify(email));
        try{
            const verifyEmail = await VerifyEmail(email);
            console.log(verifyEmail.status);
            handleOpenModal();
        }catch(err){
            console.log(err);
        }
    }
    const handleOpenModal = () => {
        setModalVisible(true);
        console.log("open modal");
    };
    
    const handleCloseModal = () => {
        const codeConcat = concatenateValues(code);

        verifyCode()
        console.log(codeConcat);
        
        setModalVisible(false);
        setModalConfirm(true);      
    };

    const handleCloseModalConfirm = () => {
        console.log("close modal");
        setModalConfirm(false);      
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
                    <Text style={StyleSingleText.onlyText}>{t('PersonalInfo')}</Text>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            phone: "",
                            password: "",
                            username: "",
                            age: 0,
                        }}
                        onSubmit={handleSubmit}
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
                                    value={values.age?.toString()}
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
                                <TouchableOpacity style={StyleSingleText.boton}
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
                        <Text style={{...StyleSingleText.texts, width:300, left:-10}}>{t('ModalMsgInicio')}</Text>
                        <Text style={StyleSingleText.texts}>{t('ModalMsgCheckEmail')}</Text>
                    <Text style={{...StyleSingleText.texts,textAlign:'center', top:15}}>{t('ModalEnterCodeMsg')}</Text> 
                    <View style={StyleSingleText.row}>
                        <TextInput style={StyleSingleText.internText}
                            placeholder="__"
                            value={code.v1}
                            onChangeText={(text) => { updateValue("v1", text)}}
                            maxLength={1}
                            keyboardType="phone-pad" 
                        />
                        <TextInput style={StyleSingleText.internText}
                            placeholder="__"
                            value={code.v2}
                            onChangeText={(text) => { updateValue("v2", text)}}
                            maxLength={1}
                            keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                            placeholder="__"
                            value={code.v3}
                            onChangeText={(text) => { updateValue("v3", text)}}
                            maxLength={1}
                            keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                            placeholder="__"
                            value={code.v4}
                            onChangeText={(text) => { updateValue("v4", text)}}
                            maxLength={1}
                            keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                            placeholder="__"
                            value={code.v5}
                            onChangeText={(text) => { updateValue("v5", text)}}
                            maxLength={1}
                            keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                            placeholder="__"
                            value={code.v6}
                            onChangeText={(text) => { updateValue("v6", text)}}
                            maxLength={1}
                            keyboardType="phone-pad"   
                        />
                        </View>
                        <TouchableOpacity style={{...StyleSingleText.boton,top:55}}
                            onPress={handleCloseModal}
                        >
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
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={StyleSingleText.internText}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        </View>
                        <TouchableOpacity style={{...StyleSingleText.boton,top:60}}
                        onPress={handleCloseModalConfirm}
                        >
                            <Text style={{...Styles.txtBtn, top:-1}}>{t('ModalBtnVerify')}</Text>
                        </TouchableOpacity>
                    </View>
                </ModalVerifyUser>
            </ScrollView>
        </SafeAreaView>
    )
}

const StyleSingleText = StyleSheet.create({
    onlyText:{
        ...Styles.textos,
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
        top: 205,
        right:10,
        left:20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius:10,
        borderColor: 'black',
        borderWidth: 2,
        padding: 20,  
    },
    subContainer:{
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
    boton:{
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

