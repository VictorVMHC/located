import React, { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, FontStyles } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';


interface Props {
    modalInputTItle: string;
    borderColor?: string;
    ActionSelected?: (item: string) => void;
    ActionMultiSelected?: (item: string[]) => void;
    data: string[];
    ActionSubmit: (value:string) => void;
    onEndAction: () => void;
    placeHolder: string;
    buttonTitle: string;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    multiSelection: boolean;
    actionOnPressOpenModal: () => void
}

export const CustomPicker = ({multiSelection, actionOnPressOpenModal, borderColor, ActionMultiSelected, modalInputTItle, data, ActionSelected, onEndAction, buttonTitle, placeHolder, ActionSubmit, modalVisible, setModalVisible }: Props) => {
    
    const { t } = useTranslation();

    const [value, setValue] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]); 

    const handleSelection = (value:string) => {
        
        if(multiSelection ){
            const newSelectedItems = selectedItems.includes(value)
                ? selectedItems.filter(selectedItem => selectedItem !== value)
                : [...selectedItems, value];
            setSelectedItems(newSelectedItems);
            ActionMultiSelected!(newSelectedItems);
            setModalVisible(true)
        }
        else {
            ActionSelected!(value)
            setModalVisible(false)
        }
    }
    return (
        <View style={{...styles.textInputSty, borderColor: borderColor || Colors.darkGray}}>
            <TouchableOpacity onPress={() => {setModalVisible(true); actionOnPressOpenModal();}} style={styles.button}>
                <View style={styles.buttonView}>
                    <View style={{flex: 9}}>
                        <Text style={styles.selectedOption} adjustsFontSizeToFit >{ modalInputTItle }</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}} >
                        <Icon name='chevron-down' size={18} color={ Colors.darkGray} style={{ marginTop: 2 }}/>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                
                <View style={styles.modalContainer}>
                    <FlatList<string>
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                handleSelection(item)
                            }}>
                                <Text style={{ ...styles.modalOption, color: selectedItems.includes(item) ? 'green' : 'white' }} adjustsFontSizeToFit >{item}</Text>
                            </TouchableOpacity>
                        )}
                        onEndReached={onEndAction}
                        onEndReachedThreshold={0.3}
                    />
                    <TextInput
                        style={styles.textInputModal}
                        placeholderTextColor={Colors.greenSuccess}
                        placeholder={placeHolder}
                        onChangeText={(text) => setValue(text)}
                        onEndEditing={() => {
                            ActionSubmit(value)
                            setModalVisible(multiSelection);
                            setValue('');
                        }}
                        value={value}
                    />
                    <Button title={buttonTitle} onPress={() => ActionSubmit(value)} />
                    <TouchableOpacity 
                        style={styles.styleFinishBtn} 
                        onPress={() => setModalVisible(false)} 
                    >
                        <Text adjustsFontSizeToFit style={{color: 'white'}}>{t('CustomPickerFinish')}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={{position:'absolute', right: 20, top:20}}
                    onPress={() => setModalVisible(false)}
                >
                    <Icon name='times' size={25}  light color={Colors.white}/>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex:1,
    },
    textInputSty: {
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    buttonView:{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center'
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
    },
    styleFinishBtn:{
        backgroundColor: Colors.greenSuccess, 
        marginTop: 10, 
        paddingHorizontal: 25, 
        paddingVertical: 5, 
        borderRadius: 8
    }
});
    