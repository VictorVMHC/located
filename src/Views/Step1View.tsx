import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Colors, FontStyles } from '../Themes/Styles';
import { useTranslation } from 'react-i18next';

export const Step1View = () => {
    const { t } = useTranslation();
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.viewLocalName}>
                    <Text style={styles.generalText}> {t('step1LocalName')} </Text>
                    <TextInput
                        placeholder='Agrega el nombre de tu local'
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputStyleName}
                    />
                </View>
                <View style={styles.viewLocalDescription}>
                    <Text style={styles.generalText}> {t('step1LocalDesc')} </Text>
                    <Text style={FontStyles.Text}> {t('step1RecommendationTitle')} </Text>
                    <Text style={styles.informationText}> {t('step1Recommendation')} </Text>
                    <TextInput
                        placeholder='Agrega una descripción de tu local'
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputStyleDescription}
                        multiline={true}
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
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    textInputStyleDescription: {
        flex: 1,
        borderRadius: 8,
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        textAlignVertical: 'top',
    },
});