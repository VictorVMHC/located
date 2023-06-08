import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, FontStyles, Styles } from '../Themes/Styles';

interface Props{
    scores: string
}

export const QualificationChart = ({scores=''}: Props) => {
  return (
    <View style={{width:60,height:30,flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: Colors.YellowOpacity, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8,  
      shadowOffset: {
      width: 0,
      height: 12,},
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 15,}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text  style={{...FontStyles.Information, color: 'black'}}>{scores}</Text>
        </View>
        <View>
          <Icon name='star' size={14} color="#FF5C28" solid/>
        </View>
    </View>
  )
}
