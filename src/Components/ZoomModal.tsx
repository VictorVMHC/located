import React from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../Themes/Styles';


interface Props {
    url: string;
    zoomModalVisible: boolean;
    closeZoomModal: () => void
}

export const ZoomModal = ({url, zoomModalVisible, closeZoomModal}: Props) => {
    return (
        <Modal transparent visible={zoomModalVisible} onRequestClose={closeZoomModal}>
            <View style={styles.zoomModalContainer}>
                <Image source={{ uri: url }} style={styles.zoomImage} />
                <TouchableOpacity style={styles.closeButton} onPress={closeZoomModal}>
                    <Icon name='close-outline' size={30} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    zoomModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    zoomImage: {
        width: '80%',
        height: undefined,
        aspectRatio: 1, 
        resizeMode: 'contain',
        borderRadius: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 5,
        borderRadius: 20,
        backgroundColor: Colors.grayOpacity
    },
    closeButtonText: {
        textAlign: 'center',
    },
});