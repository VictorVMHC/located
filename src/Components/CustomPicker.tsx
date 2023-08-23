import React, { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, FontStyles } from '../Themes/Styles';

interface Props {
    modalInputTItle: string;
    borderColor?: string;
    ActionSelected: (item: string) => void;
    data: string[];
    ActionSubmit: (value:string) => void;
    onEndAction: () => void;
    placeHolder: string;
    buttonTitle: string;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CustomPicker = ({borderColor, modalInputTItle, data, ActionSelected, onEndAction, buttonTitle, placeHolder, ActionSubmit, modalVisible, setModalVisible }: Props) => {
    
    const [value, setValue] = useState('');


    return (
        <View style={{...styles.textInputSty, borderColor: borderColor || Colors.darkGray}}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
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
                                ActionSelected(item)
                                setModalVisible(false)
                            }}>
                                <Text style={styles.modalOption} adjustsFontSizeToFit >{item}</Text>
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
                            setModalVisible(false);
                            setValue('');
                        }}
                        value={value}
                    />
                    <Button title={buttonTitle} onPress={() => ActionSubmit(value)} />
                </View>
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
});
    