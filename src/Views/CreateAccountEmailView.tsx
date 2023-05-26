import React, {  useState } from 'react'
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity,Modal,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circles } from '../Components/Circles';
import { Styles } from '../Themes/Styles';
import { PickerButon } from '../Components/PickerButton';
import { useTranslation } from 'react-i18next';
import { ModalVerifyUser } from '../Components/ModalVerifyUser';


export const CreateAccountEmailView = () => {
    const {t, i18n } = useTranslation();
    const [Nombre,setNombre] = useState() /* codigo de prueba para ingresar y obtener datos */
    const [Email,setEmail] = useState()
    const [Tel,setTel] = useState()
    const [Edad,setEdad] = useState()

    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirm, setmodalConfirm] = useState(false);


    const modal = () => {
        
    }

    const handleOpenModal = () => {
        setModalVisible(true);
        console.log("open modal");
    };
    
    const handleCloseModal = () => {
        console.log("close modal");
        setModalVisible(false);
        setmodalConfirm(true);      
    };

    const handleCloseModalConfirm = () => {
        console.log("close modal");
        setmodalConfirm(false);      
    };
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <Circles
                position='top'
                quantity={2}
                />
                <View style={Stylesingletext.contentOne}>
                    <View style={{}}>
                        <View style={Stylesingletext.containerBienvenido}>
                            <Text style={{...Styles.textStyle, top:5}}>{t('CreateAccount')}</Text>
                        </View>
                    </View>    
                    <View style={Stylesingletext.containerLeng} >
                        <View style={Stylesingletext.containerImgLeng}>
                            {i18n.language === 'es-MX'
                                ?   <Image source={require('../Assets/Images/Es.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                                :   <Image source={require('../Assets/Images/En.png')} style={{width: 25, height: 25, borderRadius: 15}} />
                            }
                        </View>
                        <View style={{width: 125}}>
                            <PickerButon/>
                        </View>   
                    </View>
                    </View>
                    <Image
                        style={{...Styles.imageStyle, left: -100, top:'9%'}}
                        source={require('../Assets/Images/logo_located.png')}
                    />
                    <View style={Stylesingletext.bodyView}>
                        <Text style={Stylesingletext.onlytext}>{t('Personalinfo')}</Text>
                        <TextInput style={Styles.input}
                            placeholder={`${t('Name')}`}
                        />
                        <TextInput style={Styles.input}
                        placeholder={`${t('Email')}`}
                            keyboardType='email-address'   
                        />
                        <TextInput style={Styles.input}
                        placeholder={`${t('UserName')}`}
                        />
                        <TextInput style={Styles.input}
                            placeholder={`${t('Phonenumber')}`}
                            keyboardType="phone-pad"   
                        />
                        <TextInput style={Styles.input}
                            placeholder={`${t('Age')}`}
                            keyboardType='number-pad'
                        />
                    <TouchableOpacity style={Styles.boton}
                        onPress={handleOpenModal}
                    >
                        <Text style={Styles.txtbtn}>{t('Registrar')}</Text>
                    </TouchableOpacity>
                </View>
                <ModalVerifyUser
                    isVisible={modalVisible}
                    closeModal={handleCloseModal}
                >
                    <View style={Stylesingletext.contenedor}>
                    <View style={Stylesingletext.subcontenedor}>
                        <Text style={Stylesingletext.textos}>{t('ModalMsgInicio')}</Text>
                        <Text style={Stylesingletext.textos}>{t('ModalMsgCheckEmail')}</Text>
                    </View>
                    <Text style={{...Stylesingletext.textos,left:80, top:15}}>{t('ModalEnterCodeMsg')}</Text> 
                    <View style={Stylesingletext.row}>
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        </View>
                        <TouchableOpacity style={Stylesingletext.boton}
                        onPress={handleCloseModal}
                        >
                            <Text style={Styles.txtbtn}>{t('ModalBtnVerify')}</Text>
                        </TouchableOpacity>
                    </View>
                </ModalVerifyUser>
                <ModalVerifyUser
                    isVisible={modalConfirm}
                    closeModal={handleCloseModalConfirm}
                >
                    <View style={Stylesingletext.contenedor}>
                    <View style={Stylesingletext.subcontenedor}>
                        <Text style={Stylesingletext.textos}>{t('ModalMsgInicio')}</Text>
                        <Text style={Stylesingletext.textos}>{t('ModalMsgCheckEmail')}</Text>
                    </View>
                    <Text style={{...Stylesingletext.textos,left:80, top:15}}>{t('ModalEnterCodeMsgFail')}</Text> 
                    <View style={Stylesingletext.row}>
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        <TextInput style={Stylesingletext.intext}
                        placeholder="__"
                        keyboardType="phone-pad"   
                        />
                        </View>
                        <TouchableOpacity style={Stylesingletext.boton}
                        onPress={handleCloseModalConfirm}
                        >
                            <Text style={Styles.txtbtn}>{t('ModalBtnVerify')}</Text>
                        </TouchableOpacity>
                    </View>
                </ModalVerifyUser>
            </ScrollView>
        </SafeAreaView>
    )
}

const Stylesingletext = StyleSheet.create({
    onlytext:{
        ...Styles.textos,
        width: 340,
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
    containerBienvenido:{
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    containerLeng:{
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        width: 218,
    },
    containerImgLeng:{
        width: 30, 
        height: 53, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    containerLogo:{
        justifyContent: 'center', 
        alignItems: 'center', 
        top: '8%'
    },contenedor:{
        width: 350,
        height: 250,
        top: 190,
        left: 30,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius:10,
        borderColor: 'black',
        borderWidth: 2,
        padding: 20,  
    },
    subcontenedor:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flexWrap:'wrap',
    },
    row:{
        flexDirection:'row',
        flexWrap:'wrap',
        top: 30,
    },
    intext:{
        left: 10,
        height: 40,
        width: 50,
        color:'blue',
    },
    textos:{
        color:'blue',
        fontSize:20,
        fontFamily:'bold',
    },
    boton:{
        ...Styles.boton,
        top:40,
    },
});
