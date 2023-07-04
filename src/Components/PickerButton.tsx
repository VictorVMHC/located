import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, FontStyles, Styles } from '../Themes/Styles';

export const PickerButton = () => {
    const {t, i18n} = useTranslation();
    return (
        <Picker
            selectedValue={i18n.language}
            onValueChange={( value ) => i18n.changeLanguage(value)}
            style={{...FontStyles.SubTitles, width: '90%'}}
            mode='dialog'
            dropdownIconRippleColor={Colors.blueAqua}
            dropdownIconColor={Colors.black}
        >
            <Picker.Item label={t('SpanishMx').toString()} value='es-MX'  style={FontStyles.Information}/>
            <Picker.Item label={t('EnglishEu').toString()} value='en-US' style={FontStyles.Information} />
        </Picker>
    )
}
