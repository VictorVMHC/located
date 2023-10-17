import React, { ReactNode } from 'react'
import { Dimensions, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../Themes/Styles';
import { Formik } from 'formik';
import { Local } from '../Interfaces/DbInterfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

interface Props {
    flagValue: string,
    _id: string,
    name?: string,
    businessType?: string,
    town?: string,
    country?: string,
    isVisible: boolean;
    children?:ReactNode,
    onClose: () => void;
}

export function ModalUpdateLocal({ flagValue, _id, name, businessType, town, country, isVisible, onClose }: Props) {
    const handleSubmit = async (values: Local) => {
        // Maneja la lógica de envío del formulario aquí
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={StyleModal.container}>
                <Formik
                    initialValues={{
                        _id: _id || '',
                        name: name || '',
                        description: '',
                        address: '',
                        uriImage: '',
                        isVerify: false, 
                        country: '',
                        state: '',
                        town: '',
                        postalCode: '',
                        contact: {
                            email: { info: '' },
                            telefono: { info: '' },
                        },
                        schedules: [],
                        rate: 0,
                        quantityRate: 0,
                        tags: [],
                        location: { latitude: 0, longitude: 0 },
                        open: '',
                        businessType: '',
                        localLikes: 0,
                        liked: false,
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values);
                        onClose(); 
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                            <TextInput
                                style={StyleModal.textInputModal}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {/* Agrega otros campos del formulario aquí */}
                            <TouchableOpacity onPress={handleSubmit}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </View>
        </Modal>
    )
}

const StyleModal = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    textInputModal:{
        width: windowWidth*0.85,
        height: windowWidth*0.12,
        backgroundColor: Colors.white,
        color: Colors.black
    },
    updateButton:{
        width: windowWidth*0.8,
        height: windowWidth*0.15,
        backgroundColor: Colors.Yellow,
    }
})