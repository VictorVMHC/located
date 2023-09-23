import React from 'react'
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';

interface Props{
  Description?: string,
  
}

interface TextEtiqueta{
  tags: string[]
}

export const DescriptionBox = ({ Description = '' }:Props) => {
  const {width, height} = useWindowDimensions();


  return (
    <View style={{...styles.box ,width: width - (width * 0.1), height: height - (height * 0.8)}}>
      <View>
        <Text style={styles.text}>{Description}</Text>
      </View>
      <View style={{ flex: 1.5, flexDirection: 'row', paddingHorizontal: 10, justifyContent:'flex-start', marginBottom: 10}}>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
box:{
  borderBottomRadius: 20,
  padding:10,
  borderWidth: 0.5,
  borderColor: '796D6D',
  borderTopWidth: 0,
  borderBottomStartRadius: 15,
  borderBottomEndRadius: 15,
  paddingHorizontal: 15,
},
text:{
  fontSize:18,
  color: 'black',
  textAlign: 'justify'
}
})
