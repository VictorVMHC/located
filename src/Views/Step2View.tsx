import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Button, StyleSheet, TextInput, FlatList, Alert, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { addBusinessType, getBusinessTypes } from '../Api/businessTypes';
import { Colors, FontStyles } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';

interface showAlertProps {
    title: string,
    desc: string,
    action: () => void
}

const showAlert = ({title, desc, action}: showAlertProps) => {
    Alert.alert(
        title,
        desc,
        [{ text: 'OK', onPress: () => { action }}],
        { cancelable: false }
    );
}


export const Step2View = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const [newBusiness, setNewBusiness] = useState('');
    const [businessOptions, setBusinessOptions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { t } = useTranslation();

    useEffect(() => {       
        if( businessOptions.length === 0 ){
            fetchBusinessTypes();
        }
    }, []);


    const fetchBusinessTypes = async () => {
        getBusinessTypes(currentPage).then((response) => {
            
            if(response.status !== 200){
                showAlert({
                    title: `${t('step2AlertError')}`, 
                    desc: `${t('step2AlertErrDescGet')}`, 
                    action: () => setModalVisible(false)
                })
            }
            const { business_options, total_pages  } = response.data;
            setBusinessOptions([...businessOptions, ...business_options]);
            setCurrentPage(currentPage + 1);
            setTotalPages(total_pages);
        }
        ).catch(() => {
            showAlert({
                title: `${t('step2AlertError')}`, 
                desc: `${t('step2AlertErrDescGet')}`, 
                action: () => setModalVisible(false)
            })
        }) 
    };

    const handleAddNewBusiness = async () => {
        if (newBusiness && !businessOptions.includes(newBusiness)) {
            addBusinessType(newBusiness).then((response) => {

                if(response.status !== 200){
                    showAlert({
                        title: `${t('step2AlertError')}`, 
                        desc: `${t('step2AlertErrDescSave')}`, 
                        action: () => setModalVisible(false)
                    })
                }

                setBusinessOptions([...businessOptions, newBusiness]);
                setSelectedBusiness(newBusiness);
                setNewBusiness('');
                setModalVisible(false);
                
            }
            ).catch(() => {
                showAlert({
                    title: `${t('step2AlertError')}`, 
                    desc: `${t('step2AlertErrDescSave')}`, 
                    action: () => setModalVisible(false)
                })
            })
        }
        
    };

    const handleLoadMore = async () => {
        if (currentPage <= totalPages) {
            fetchBusinessTypes();
        }
    };


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView style={{flexGrow: 1, paddingBottom: 20}}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>Selecciona un tipo de negocio:</Text>
                    <View style={styles.textInputSty}>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                            <View style={styles.buttonView}>
                                <View style={{flex: 9}}>
                                    <Text style={styles.selectedOption} adjustsFontSizeToFit >{selectedBusiness || 'Seleccionar opción'}</Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}} >
                                    <Icon name='chevron-down' size={18} color={Colors.darkGray} style={{ marginTop: 2 }}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>¿Cual es la dirección de tu local?</Text>
                    <TextInput
                        placeholder='Pais'
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                    />
                    <TextInput
                        placeholder='Estado'
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                    />
                    <TextInput
                        placeholder='Municipio'
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                    />
                    <TextInput
                        placeholder='Código postal'
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                    />

                    <Modal
                        visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <FlatList<string>
                                data={businessOptions}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        setSelectedBusiness(item)
                                        setModalVisible(false)
                                    }}>
                                        <Text style={styles.modalOption} adjustsFontSizeToFit >{item}</Text>
                                    </TouchableOpacity>
                                )}
                                onEndReached={handleLoadMore}
                                onEndReachedThreshold={0.3}
                            />
                            <TextInput
                                style={styles.textInputModal}
                                placeholderTextColor={Colors.greenSuccess}
                                placeholder="Agregar nuevo tipo de negocio"
                                onChangeText={(text) => setNewBusiness(text)}
                                value={newBusiness}
                            />
                            <Button title="Agregar" onPress={handleAddNewBusiness} />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        color: Colors.black
    },
    button: {
        flex:1,
    },
    buttonView:{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInputSty: {
        borderRadius: 8,
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    selectedOption: {
        ...FontStyles.Text,
        padding: 5,
    },
    modalContainer: {
        flex: 1,
        paddingVertical: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalOption: {
        fontSize: 18,
        marginVertical: 10,
        color: 'white',
        textAlign: 'center'
    },
    textInputModal:{
        borderRadius: 8,
        borderColor: Colors.greenSuccess,
        borderWidth: 2,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: Colors.white,
        color: Colors.greenSuccess
    }
});
    