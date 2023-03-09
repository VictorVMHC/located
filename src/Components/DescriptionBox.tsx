import React from 'react'
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import { Styles } from '../Themes/Styles';

interface Props{
  Descripcion?: string
}

export const DescriptionBox = ({Descripcion = ''}:Props) => {

  const {width, height} = useWindowDimensions();

  return (
   <View style={{...styles.box ,width: width - (width * 0.1), height: height - (height * 0.8)}}>
    <Text style={styles.text}>{Descripcion}</Text>
   </View>
  )
}

const styles = StyleSheet.create({
box:{
  backgroundColor: 'white',
  borderBottomRadius: 20,
  padding:10,
  borderWidth: 0.5,
  borderColor: '796D6D',
  borderTopWidth: 0,
  borderBottomStartRadius: 15,
  borderBottomEndRadius: 15,


},
text:{
  fontSize:18,
  color: 'black',
  textAlign: 'justify'

}
})
