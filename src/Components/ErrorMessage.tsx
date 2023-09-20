import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface Props{
    message: string
}
const ErrorComponent = ({ message }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default ErrorComponent;