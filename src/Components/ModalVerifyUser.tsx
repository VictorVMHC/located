import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import { useTranslation } from 'react-i18next';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { FontStyles, Styles } from '../Themes/Styles'
import { useEffect, useState } from 'react';

interface Props{
    isVisible:boolean,
    closeModal:() =>void,
}


export const ModalVerifyUser = ({isVisible, closeModal}: Props) => {
    const {t,i18n} = useTranslation();
    const [modalVisible, setModalVisible] = useState(isVisible);

    useEffect(() => {
        setModalVisible(isVisible);
    }, [isVisible]);
    
    const handleCloseModal = () => {
        closeModal();
    }
    return (
        
        <ScrollView contentContainerStyle={{flex:1}}> 
    <Modal 
        animationType='slide'
        transparent={true}
        visible={modalVisible}
    >   
        
        <View style={StylesModal.contenedor}>
            <View style={StylesModal.subcontenedor}>
            <Text style={StylesModal.textos}>{t('ModalMsgInicio')}</Text>
        <Text style={StylesModal.textos}>{t('ModalMsgCheckEmail')}</Text>
        </View>
        <Text style={{...StylesModal.textos,left:80, top:15}}>{t('ModalEnterCodeMsg')}</Text> 
        <View style={StylesModal.row}>
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        <TextInput style={StylesModal.intext}
        placeholder="__"
        keyboardType="phone-pad"   
        />
        </View>
        <TouchableOpacity style={StylesModal.boton}
        onPress={handleCloseModal}
        >
        <Text style={Styles.txtbtn}>{t('ModalBtnVerify')}</Text>
        </TouchableOpacity>
        </View>
    </Modal>
    </ScrollView>   
    )
}

const StylesModal= StyleSheet.create({
    contenedor:{
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
