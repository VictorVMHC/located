import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PickerDayButton } from '../Components/PickerDayButton';
import { Schedule } from '../Interfaces/DbInterfaces';

export const Step4View = () => {

    const [schedule, setSchedule] = useState<Schedule[]>([]);

    const updateScheduleItem = (scheduleNumber: number, updateData: Partial<Schedule>) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[scheduleNumber] = {
            ...updatedSchedule[scheduleNumber],
            ...updateData,
        };
        setSchedule(updatedSchedule);
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View>
                    <PickerDayButton
                        title={'Del dia'}
                        day='day2'
                        action={updateScheduleItem}
                        index={1}
                    />
                </View>
                <Text>{JSON.stringify(schedule)}</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
