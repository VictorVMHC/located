import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, FontStyles } from '../Themes/Styles'
import { useTranslation } from 'react-i18next'
import { TextInputAndIcon } from '../Components/TextInputAndIcon'

export const Step5View = () => {
    const { t } = useTranslation();
    
    return (

        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} >
                <TextInputAndIcon
                    iconName='facebook-f'
                    placeHolder='ICON'
                />
                <TextInputAndIcon
                    iconName='envelope'
                    placeHolder='ICON'
                />
                <TextInputAndIcon
                    iconName='facebook-f'
                    placeHolder='ICON'
                />
                <TextInputAndIcon
                    iconName='facebook-f'
                    placeHolder='ICON'
                />
                <TextInputAndIcon
                    iconName='facebook-f'
                    placeHolder='ICON'
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