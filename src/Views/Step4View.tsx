import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScheduleSection } from '../Components/ScheduleSection';
import { Schedule } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';

export const Step4View = () => {
    const initialSchedule: Schedule[] = [
        {day1: '', day2: '', open:`${new Date().getHours()} : ${new Date().getMinutes()}` , close: `${new Date().getHours()} : ${new Date().getMinutes()}` }, 
    ];

    const [schedule, setSchedule] = useState<Schedule[]>(initialSchedule);
    
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
            <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                <ScheduleSection  schedule={schedule} setSchedule={setSchedule} updateScheduleItem={updateScheduleItem} />
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
    containerSchedule: {
        borderColor: Colors.darkGray,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: '90%',
        alignSelf: 'center'
        
    },
    containerDays: {
        flexDirection: 'row',
        height: '50%'
    },
    containerHours: {
        flexDirection: 'row',
        height: '50%'
    },
    containerPickerButton:{
        flex: 5, 
        margin: 5,
        justifyContent: 'center',
        borderColor: Colors.darkGray,
        borderWidth: 1,
        borderRadius: 10,
    },
    containerHourOpen:{
        flex: 5, 
        margin: 5,
        borderColor: Colors.greenSuccess,
        borderWidth: 1,
        borderRadius: 10,
    },
    containerHourClose:{
        flex: 5, 
        margin: 5,
        borderColor: Colors.red,
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
    touchablePlus: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.YellowOpacity,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: -16,
        right: -16,
        backgroundColor: Colors.gray,
    },
});