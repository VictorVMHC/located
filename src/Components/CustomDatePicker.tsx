import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { Colors } from '../Themes/Styles'
import { Schedule } from '../Interfaces/DbInterfaces'
import { ColorSpace } from 'react-native-reanimated'

interface Props {
    type: 'open' | 'close';
    currentHour: string;
    action: (scheduleNumber: number, updateData: Partial<Schedule>) => void;
    index:number;
    modalTitle: string;
    leftTag: string;

}

export const CustomDatePicker = ({ type = 'open', currentHour, action, index, modalTitle, leftTag }: Props) => {
    const [hour, setHour] = useState(new Date())
    const [openHour, setOpenHour] = useState(false)
    
    const handleConfirm = (date: Date) => {
        setOpenHour(false)
        setHour(date)
        var hour = `${date.getHours()} : ${date.getMinutes()}` 
        type === 'open' ? action(index, {open: hour}) : action(index, {close: hour})
    }
    
    return (
        <View style={{...styles.containerHour, borderColor: type === 'open' ? Colors.greenSuccess : Colors.red }} >
            <TouchableOpacity   
                onPress={() => setOpenHour(true)}
                style={styles.stylesTouchable}
            >
                <Text style={{color: 'black', fontWeight: 'bold', marginRight: 5}} >{ leftTag } </Text>
                <Text style={{color: 'black', fontWeight: 'bold'}} >{currentHour}</Text>    
            </TouchableOpacity>
            <DatePicker
                modal
                title={modalTitle}
                mode='time'
                open={openHour}
                date={hour}
                onConfirm={handleConfirm}
                onCancel={() => {
                    setOpenHour(false)
                }}
                is24hourSource= 'locale'
                style={{ flex: 1 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerHour:{
        flex: 5, 
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    stylesTouchable: {
        flexDirection: 'row',
        alignItems:'center',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 10
    },
});