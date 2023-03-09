import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FontStyles } from '../Themes/Styles';

interface Props {
    text: string
}
export const Tag = ({text}: Props) => {
  return (
    <View  style={styles.tagStyle} >
        <Text style={styles.textTag} >{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    tagStyle: {
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5
    },
    textTag:{
        ...FontStyles.Information,
    }
});