// PickerDayButton
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Colors, FontStyles } from '../Themes/Styles';
import { Schedule } from '../Interfaces/DbInterfaces';
import { daysOfWeekEs, daysOfWeekEn} from '../Utils/DaysOfWeek';
import { useTranslation } from 'react-i18next';


interface Props {
    title: string,
    action: (index: number,value: Partial<Schedule>) => void,
    day: 'day1' | 'day2',
    index: number
}

export const PickerDayButton = ({ title, action, day, index }: Props) => {

    const {i18n} = useTranslation();
    const daysOfWeek = i18n.language === 'es-MX' ? daysOfWeekEs : daysOfWeekEn;

    const handleValueChange = (selectedDay: string) => {
        day === 'day1' 
            ? action(index, { day1: selectedDay }) 
            : action(index, { day2: selectedDay });
    };

    return (
        <Picker
            selectedValue={title}
            onValueChange={handleValueChange}
            style={{ ...FontStyles.SubTitles }}
            mode='dialog'
            dropdownIconRippleColor={Colors.blueAqua}
            dropdownIconColor={Colors.black}
        >
            <Picker.Item label={title} value="" style={FontStyles.Information} />
            {daysOfWeek.map((element) => (
                <Picker.Item
                    key={element}
                    label={element}
                    value={element}
                    style={FontStyles.Information}
                />
            ))}
        </Picker>
    )
}
