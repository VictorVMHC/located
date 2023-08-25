/*import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScheduleSection } from '../Components/ScheduleSection';
import { Schedule } from '../Interfaces/DbInterfaces';
import { Colors } from '../Themes/Styles';
import { CustomPicker } from '../Components/CustomPicker';

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
    const data = ['']
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                <View style={styles.containerSchedule}>
                    <ScheduleSection  schedule={schedule} setSchedule={setSchedule} updateScheduleItem={updateScheduleItem} />
                </View>
                <View style={styles.containerCategories}>
                    <View>
                        //borderColor, modalInputTItle, data, ActionSelected, onEndAction, buttonTitle, placeHolder, ActionSubmit
                        <CustomPicker
                            modalInputTItle='Add category'
                            data={data}
                            ActionSelected={}
                            buttonTitle='Agregar categoria'
                            onEndAction={}
                        >
                    </View>
                    <View>

                    </View>
                </View>
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
        flex: 1,
        backgroundColor: 'red'
    },
    containerCategories:{
        flex:1,
        backgroundColor: 'red'
    }

}); */