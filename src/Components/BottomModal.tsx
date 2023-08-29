import React from 'react'
import { useTranslation } from 'react-i18next';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
interface Props {
    hideModal: () => void
    modalVisible: boolean
    slideUp: Animated.AnimatedInterpolation<string | number>;
    enable?: boolean;
    actionBtn1: () => void
    actionBtn2: () => void
    actionBtn3: () => void
}
export const BottomModal = ({actionBtn1, actionBtn2, actionBtn3, modalVisible, hideModal, slideUp, enable=true}: Props) => {
    const { t } = useTranslation();
    return (
        <Modal transparent visible={modalVisible} onRequestClose={hideModal}>
            <TouchableOpacity style={styles.overlay} onPress={hideModal}>
                <Animated.View style={[styles.modal, { transform: [{ translateY: slideUp }] }]}>
                    <TouchableOpacity 
                        style={[styles.modalButton, !enable && styles.disabledButton]} 
                        disabled={enable} 
                        onPress={actionBtn1}
                    >
                        <View style={styles.buttons}>
                            <Icon name='eye' light size={25} adjustsFontSizeToFit style={{marginRight: 5}}/>
                            <Text adjustsFontSizeToFit>{t('btn1SeeProfile')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={actionBtn2}>
                        <View style={styles.buttons}>
                            <Icon  style={{marginRight: 5}} name='images' light size={25} adjustsFontSizeToFit/>
                            <Text adjustsFontSizeToFit>{t('btn2Upload')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={actionBtn3}>
                        <View style={styles.buttons}>
                            <Icon  style={{marginRight: 5}} name='camera-retro' light size={25} adjustsFontSizeToFit/>
                            <Text adjustsFontSizeToFit>{t('btt3TakePicture')}</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    modalButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttons:{
        flexDirection: 'row',
        alignItems: 'center'
    }
});