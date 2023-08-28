import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props{
    isVisible:boolean,
    closeModal:() =>void,
    children?:ReactNode
}


export const ModalVerifyUser = ({isVisible, closeModal, children}: Props) => {

 
    const [modalVisible, setModalVisible] = useState(isVisible);

    useEffect(() => {
        setModalVisible(isVisible);
    }, [isVisible]);
    

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


