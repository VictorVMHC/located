import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import { useTranslation } from 'react-i18next';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { FontStyles, Styles } from '../Themes/Styles'
import { ReactNode, useEffect, useState } from 'react';

interface Props{
    isVisible:boolean,
    closeModal:() =>void,
    children?:ReactNode
}


export const ModalVerifyUser = ({isVisible, closeModal, children}: Props) => {
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
            {children}
        </Modal>
    </ScrollView>   
    )
}

const StylesModal= StyleSheet.create({
    
});
