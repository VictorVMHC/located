import React from 'react'
import { Animated, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native'
interface Props {
    hideModal: () => void
    modalVisible: boolean
    slideUp: Animated.AnimatedInterpolation<string | number>
}
export const BottomModal = ({modalVisible, hideModal, slideUp}: Props) => {
    return (
        <Modal transparent visible={modalVisible} onRequestClose={hideModal}>
            <TouchableOpacity style={styles.overlay} onPress={hideModal}>
                <Animated.View style={[styles.modal, { transform: [{ translateY: slideUp }] }]}>
                    <TouchableOpacity style={styles.modalButton}>
                        <Text>Button 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}>
                        <Text>Button 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}>
                        <Text>Button 3</Text>
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
});