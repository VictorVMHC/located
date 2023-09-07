import React, { useContext, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, FontStyles } from '../Themes/Styles'
import { useTranslation } from 'react-i18next'
import { TextInputAndIcon } from '../Components/TextInputAndIcon'
import { LocalContext } from '../Context/NewLocalContext'

interface Props{
    setCanGoNext: React.Dispatch<React.SetStateAction<boolean>>
}

export const Step5View = ({ setCanGoNext }:Props) => {
    const { localState, updateLocal } = useContext(LocalContext);
    const { contact } = localState
    const { t } = useTranslation();

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

    console.log(JSON.stringify(contact));
    
    
    return (

        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} >
                <TextInputAndIcon
                    iconName='facebook-f'
                    placeHolder='Facebook'
                    value={contact['facebook']?.info}
                    action={handleAddContact}
                />
                <TextInputAndIcon
                    iconName='envelope'
                    placeHolder='Email'
                    value={contact['Email']?.info}
                    action={handleAddContact}
                />
                <TextInputAndIcon
                    iconName='instagram'
                    placeHolder='Instagram'
                    value={contact['instagram']?.info}
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