import React from 'react';
import { Text , View } from 'react-native';

import { Card } from '../Components/Card';
import { CardAcordeon } from '../Components/CardAcordeon';
import { local } from '../Utils/Data _Example';

export const TestScreen = () => {
  return (

    <View style={{flex: 1, backgroundColor: 'white'}}>
        <Card local={local} cardWidth={0} cardHeight={0} like={false}/>
    </View>
  )
}
