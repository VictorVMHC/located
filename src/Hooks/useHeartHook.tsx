import React, { useState } from 'react';
import { default as IonIcon } from 'react-native-vector-icons/Ionicons';
import { Colors } from '../Themes/Styles';

export const useHeartHook = (value: boolean) => {
    const [isActive, setActive] = useState(value)

    const check = ( )  =>{
      if(isActive)
      {
        setActive(false)
      }
      else
      {
        setActive(true)
      }
    }

  return {
    isActive,
    check
  }
}
