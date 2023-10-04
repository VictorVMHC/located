import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FlatList, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addBusinessType, getBusinessTypes } from '../Api/businessTypes';
import { Colors, FontStyles } from '../Themes/Styles';
import { CustomAlert } from '../Components/CustomAlert';
import { LocalContext } from '../Context/NewLocalContext';

interface Props{
    setCanGoNext: React.Dispatch<React.SetStateAction<boolean>>
}

export const Step2View = ({setCanGoNext}:Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newBusiness, setNewBusiness] = useState('');
    const [businessOptions, setBusinessOptions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { t } = useTranslation();
    const {localState, updateLocal} = useContext(LocalContext);
    const {businessType, country, state, town, postalCode, address} = localState

    useEffect(() => {       
        if( businessOptions.length === 0 ){
            fetchBusinessTypes();
        }
    }, []);

    useEffect(()=> {
        if(businessType && country && state && town && postalCode && address){
            setCanGoNext(true);
        }
    }, [localState]);

    const fetchBusinessTypes = async () => {
        getBusinessTypes(currentPage).then((response) => {
            
            if(response.status !== 200){
                CustomAlert({
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
            CustomAlert({
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
                    CustomAlert({
                        title: `${t('step2AlertError')}`, 
                        desc: `${t('step2AlertErrDescSave')}`, 
                        action: () => setModalVisible(false)
                    })
                }

                setBusinessOptions([...businessOptions, newBusiness]);
                updateLocal({businessType: newBusiness});
                setNewBusiness('');
                setModalVisible(false);   
            }
            ).catch(() => {
                CustomAlert({
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
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} >
                <View style={{flex: 1}}>
                    <Text style={styles.title}> {t('step2Title')} </Text>
                    <View style={styles.textInputSty}>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                            <View style={styles.buttonView}>
                                <View style={{flex: 9}}>
                                    <Text style={styles.selectedOption} adjustsFontSizeToFit >{businessType || `${t('step2ChooseOption')}` }</Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}} >
                                    <Icon name='chevron-down' size={18} color={Colors.darkGray} style={{ marginTop: 2 }}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}> {t('step2Address')} </Text>
                    <TextInput
                        placeholder={`${t('step2PhAddress')}`}
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                        value={address}
                        onChangeText={(text) => updateLocal({address: text})}
                    />
                    <TextInput
                        placeholder={`${t('step2PhCountry')}`}
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                        value={country}
                        onChangeText={(text) => updateLocal({country: text})}
                    />
                    <TextInput
                        placeholder={`${t('step2PhState')}`}
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                        value={state}
                        onChangeText={(text) => updateLocal({state: text})}
                    />
                    <TextInput
                        placeholder={`${t('step2PhTown')}`}
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                        value={town}
                        onChangeText={(text) => updateLocal({town: text})}
                    />
                    <TextInput
                        placeholder={`${t('step2PhPosCode')}`}
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputSty}
                        value={postalCode}
                        maxLength={5}
                        keyboardType='number-pad'
                        onChangeText={(text) => updateLocal({postalCode: text})}
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
                                        updateLocal({ businessType: item });
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
                                placeholder={`${t('step2PhNewBusiness')}`}
                                onChangeText={(text) => setNewBusiness(text)}
                                value={newBusiness}
                                onSubmitEditing={handleAddNewBusiness}
                            />
                            <Button title={t('step2BtnText')} onPress={handleAddNewBusiness} />
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
        color: 'black',
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