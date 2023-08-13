import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Colors, FontStyles } from '../Themes/Styles';

export const Step1View = () => {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.viewLocalName}>
                    <Text style={styles.generalText}>Nombre de tu local</Text>
                    <TextInput
                        placeholder='Agrega el nombre de tu local'
                        placeholderTextColor={Colors.darkGray}
                        style={styles.textInputStyleName}
                    />
                </View>
                <View style={styles.viewLocalDescription}>
                    <Text style={styles.generalText}>Agrega una descripcion del local</Text>
                    <Text style={FontStyles.Text}>Recomendación:</Text>
                    <Text style={styles.informationText}>Trata de ser muy específico y que tu descripción suene atractiva para tus posibles clientes. Esta descripción se mostrará en primer plano.</Text>
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