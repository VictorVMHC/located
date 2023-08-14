import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { PickerDayButton } from '../Components/PickerDayButton';
import { Schedule } from '../Interfaces/DbInterfaces';
import DatePicker from 'react-native-date-picker';

export const Step4View = () => {

    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const updateScheduleItem = (scheduleNumber: number, updateData: Partial<Schedule>) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[scheduleNumber] = {
            ...updatedSchedule[scheduleNumber],
            ...updateData,
        };
        setSchedule(updatedSchedule);
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView style={{ flexGrow: 1}}>
                <View style={{backgroundColor: 'blue'}}>
                    <View style={{backgroundColor: 'red'}}>
                        <PickerDayButton
                            title={'Del dia'}
                            day='day1'
                            action={updateScheduleItem}
                            index={1}
                        />
                        <PickerDayButton
                            title={'Del dia'}
                            day='day1'
                            action={updateScheduleItem}
                            index={1}
                        />
                    </View>
                    <View style={{backgroundColor: 'red'}}>
                        <TouchableOpacity title="Open" onPress={() => setOpen(true)} >
                            <Text>Hora</Text>    
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode='time'
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                            style={{backgroundColor:'red'}}
                            is24hourSource= 'locale'
                        />
                        </View>
                </View>
                <Text>{JSON.stringify(schedule)}</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
});