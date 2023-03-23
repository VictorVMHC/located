import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../Themes/Styles';

export const PickerButon = () => {
    const {i18n} = useTranslation();
    return (
        <Picker
            selectedValue={i18n.language}
            onValueChange={( value ) => i18n.changeLanguage(value)}
            mode='dropdown'
        >
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Ingles" value="en" />
        </Picker>
    )
}
