import React, { useContext, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, FontStyles } from '../Themes/Styles'
import { useTranslation } from 'react-i18next'
import { TextInputAndIcon } from '../Components/TextInputAndIcon'
import { LocalContext } from '../Context/NewLocalContext'
import { useWindowDimensions } from 'react-native';

interface Props{
    setCanGoNext: React.Dispatch<React.SetStateAction<boolean>>
}

export const Step5View = ({ setCanGoNext }:Props) => {
    const { localState, updateLocal } = useContext(LocalContext);
    const { contact } = localState;

    useEffect(() => {
        if (Object.keys(contact).length > 0) {
            setCanGoNext(true);
        } else {
            setCanGoNext(false);
        }
    }, [contact]);

    const handleAddContact = (type: string, value: string) => {
        const updatedContact = { ...contact };
        updatedContact[type] = { info: value };
        updateLocal({ contact: updatedContact });
    }
    
    return (

        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} >
                <TextInputAndIcon
                    iconName='facebook-f'
                    placeHolder='Facebook'
                    value={contact['Facebook']?.info}
                    action={handleAddContact}
                    height='45'
                />
                <TextInputAndIcon
                    iconName='envelope'
                    placeHolder='Email'
                    value={contact['Email']?.info}
                    action={handleAddContact}
                    height='45'
                />
                <TextInputAndIcon
                    iconName='instagram'
                    placeHolder='Instagram'
                    value={contact['Instagram']?.info}
                    action={handleAddContact}
                />
                <TextInputAndIcon
                    iconName='globe'
                    placeHolder='Web page'
                    value={contact['Web page']?.info}
                    action={handleAddContact}
                />
                <TextInputAndIcon
                    iconName='whatsapp'
                    placeHolder='Whatsapp'
                    value={contact['Whatsapp']?.info}
                    action={handleAddContact}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
});