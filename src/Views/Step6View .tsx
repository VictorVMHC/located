import React, { useState } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export const Step6View = () => {
    const [profilePicture, setProfilePicture] = useState(null);

    const handleImagePicker = () => {
        ImagePicker.showImagePicker(
        {
            title: 'Seleccionar foto de perfil',
            mediaType: 'photo',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Tomar foto',
            chooseFromLibraryButtonTitle: 'Elegir de la galería',
        },
        (response) => {
            if (!response.didCancel && !response.error) {
            setProfilePicture(response.uri);
            }
        }
        );
    };

    return (
        <View style={styles.container}>
        {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
            <Button title="Subir foto de perfil" onPress={handleImagePicker} />
        )}
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
});

export default ProfilePictureUpload;