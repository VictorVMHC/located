import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, FontStyles } from '../Themes/Styles';
import { LocalContext } from '../Context/NewLocalContext';
import { NewLocal } from '../Interfaces/LocalInterfaces';
interface Props{
    setCanGoNext: React.Dispatch<React.SetStateAction<boolean>>
}

export const Step1View = ({setCanGoNext}: Props) => {
    const { t } = useTranslation();
    const {localState, updateLocal} = useContext(LocalContext);
    const [editedName, setEditedName] = useState(localState.name);
    const [editedDescription, setEditedDescription] = useState(localState.description);

    const handleEndEditing = (value: Partial<NewLocal>) => {
        updateLocal(value);
    };

    useEffect(() => {
        
        if(localState.name && localState.description ){
            setCanGoNext(true);
        }

    },[localState]); 

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.viewLocalName}>
                    <Text style={styles.generalText}> {t('step1LocalName')} </Text>
                    <TextInput
                        placeholder={`${t('step1PlaceName')}`}
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputStyleName}
                        value={editedName}
                        onChangeText={setEditedName}
                        onEndEditing={() => handleEndEditing({name: editedName})}
                    />
                </View>
                <View style={styles.viewLocalDescription}>
                    <Text style={styles.generalText}> {t('step1LocalDesc')} </Text>
                    <Text style={FontStyles.Text}> {t('step1RecommendationTitle')} </Text>
                    <Text style={styles.informationText}> {t('step1Recommendation')} </Text>
                    <TextInput
                        placeholder={`${t('step1PlaceDesc')}`}
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputStyleDescription}
                        returnKeyType='done'
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                        onEndEditing={() => handleEndEditing({description: editedDescription})}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    viewLocalName: {
        marginBottom: 20,
    },
    viewLocalDescription: {
        flex: 1,
    },
    generalText: {
        fontFamily: 'Outfit.Regular', 
        fontSize: 20, 
        color: Colors.black,
        marginBottom: 10,
    },
    informationText: {
        fontFamily: 'Outfit-SemiBold', 
        color: Colors.blueText,
        marginBottom: 10,
    },
    textInputStyleName: {
        borderRadius: 8,
        color: 'black',
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    textInputStyleDescription: {
        flex: 1,
        color: 'black',
        borderRadius: 8,
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: 'top',
    },
});