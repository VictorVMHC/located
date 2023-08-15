// PickerDayButton
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Colors, FontStyles } from '../Themes/Styles';
import { Schedule } from '../Interfaces/DbInterfaces';

interface Props {
    title: string,
    action: (index: number,value: Partial<Schedule>) => void,
    day: 'day1' | 'day2',
    index: number
}

export const PickerDayButton = ({ title, action, day, index }: Props) => {
    const [selectedValue, setSelectedValue] = useState(title);

    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const handleValueChange = (selectedDay: string) => {
        if (day === 'day1') {
            action(index, { day1: selectedDay });
        }
        else{
            action(index, { day2: selectedDay });
        }
        setSelectedValue(selectedDay);
    };

    return (
        <Picker
            selectedValue={selectedValue}
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
