import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontStyles } from '../Themes/Styles';

interface Props {
  Value : boolean 
}

export const SwitchComponent = ({Value = ''}) => {
  return (
    <View>
      {!Value
        ?<Text style={{...FontStyles.Information, color: 'black'} }>Cerrado <Icon name='circle' size={18} solid color= '#D92C23'/></Text>
        :<Text style={{...FontStyles.Information, color: 'black'} }>Abierto <Icon name='circle' size={20} solid color= '#128807'/></Text>
      }
    </View> 
  )
}
