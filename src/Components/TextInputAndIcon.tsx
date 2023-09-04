import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';

interface Props {
    iconName: string,
    placeHolder: string
}

export const TextInputAndIcon = ({ iconName, placeHolder }: Props) => {
    
    return (
        <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.icon} >
                <Icon name={ iconName } light size={25} adjustsFontSizeToFit />
            </View>
            <TextInput
                placeholder={ placeHolder }
                placeholderTextColor={Colors.darkGray}
                style={styles.textInputSty}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInputSty: {
        flex: 9,
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    icon: {
        flex: 1,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        borderColor: Colors.darkGray,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center', 
        alignItems: 'center'
    }
});