import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../Themes/Styles';

interface Props {
    question: string,
    answer: string,
}

export const Accordion = ({question, answer,}:Props) => {
    const [expanded, setExpanded] = useState(false);

    const toggle = () => {
        setExpanded(!expanded );
    }
    return (
        <View>
            <TouchableOpacity onPress={toggle}>
                <Text style={StylesFAQ.titleQuestion}>{question} 
                <Icon name='plus' size={35} color={Colors.black} />
                </Text>
            {expanded && <View>{
             <Text style={StylesFAQ.answer}>{answer}</Text>
             }</View>}
            </TouchableOpacity>   
            <View style={StylesFAQ.separate}></View>
        </View>
    )
}

const StylesFAQ = StyleSheet.create({

    titleQuestion:{
        fontSize:14,
        fontWeight:'bold',
        color:'black',
        width:320,
    },
    answer:{
        fontSize:22,
        fontFamily:'Outfit.Light',
        textAlign:'left',
        width:320,
    },
    separate:{
        backgroundColor:'rgba(255,198,0,0.4)',
        height:3,
        width:"98%",
    }
})
