import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Button, StyleSheet, TextInput, FlatList, Alert, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { addBusinessType, getBusinessTypes } from '../Api/businessTypes';
import { Colors, FontStyles } from '../Themes/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Step2View = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const [newBusiness, setNewBusiness] = useState('');
    const [businessOptions, setBusinessOptions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {       
        if( businessOptions.length === 0 ){
            fetchBusinessTypes();
        }
    }, []);

    const fetchBusinessTypes = async () => {
        getBusinessTypes(currentPage).then((response) => {
            
            if(response.status !== 200){
                Alert.alert(
                    'Error de conexión',
                    'Ocurrió un error al tratar de guardar tu tipo de negocio',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false }
                );
            }

            const { business_options, current_page, total_pages  } = response.data;
            console.log(response.data);
            setBusinessOptions([...businessOptions, ...business_options]);
            setCurrentPage(currentPage + 1);
            setTotalPages(total_pages);
        }
        ).catch(() => {
            Alert.alert(
                'Error de conexión',
                'Ocurrió un error al tratar de guardar tu tipo de negocio',
                [{ text: 'OK', onPress: () => { setModalVisible(false) }}],
                { cancelable: false }
            );
        }) 
    };

    const handleAddNewBusiness = async () => {
        if (newBusiness && !businessOptions.includes(newBusiness)) {
            addBusinessType(newBusiness).then((response) => {

                if(response.status !== 200){
                    Alert.alert(
                        'Error de conexión',
                        'Ocurrió un error al tratar de guardar tu tipo de negocio',
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                        { cancelable: false }
                    );
                }

                setBusinessOptions([...businessOptions, newBusiness]);
                setSelectedBusiness(newBusiness);
                setNewBusiness('');
                setModalVisible(false);
                
            }
            ).catch(() => {
                Alert.alert(
                    'Error de conexión',
                    'Ocurrió un error al tratar de guardar tu tipo de negocio',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                    { cancelable: false }
                );
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
                                    <TouchableOpacity onPress={() => setSelectedBusiness(item)}>
                                        <Text style={styles.modalOption}>{item}</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalOption: {
        fontSize: 18,
        marginVertical: 10,
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
    