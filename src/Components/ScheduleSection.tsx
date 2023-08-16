import React, { SetStateAction, useState } from 'react'
import { Animated, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PickerDayButton } from './PickerDayButton'
import DatePicker from 'react-native-date-picker'
import { Schedule } from '../Interfaces/DbInterfaces'
import { Colors, Styles } from '../Themes/Styles';
import Icon  from 'react-native-vector-icons/FontAwesome5';

interface Props {
    schedule: Schedule[];
    setSchedule: React.Dispatch<SetStateAction<Schedule[]>>
    updateScheduleItem: (scheduleNumber: number, updateData: Partial<Schedule>) => void;
}
export const ScheduleSection = ({updateScheduleItem, schedule, setSchedule}: Props) => {
    const [hourOne, setHourOne] = useState(new Date())
    const [hourTwo, setHourTwo] = useState(new Date())
    const [openHourOne, setOpenHourOne] = useState(false)
    const [openHourTwo, setOpenHourTwo] = useState(false)
    const [index, setIndex] = useState<number>(0);

    const handleAddSchedule = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIndex( index + 1);
        if(index < 2){
            setSchedule([...schedule, {day1: '', day2: '', open:`${new Date().getHours()} : ${new Date().getMinutes()}` , close: `${new Date().getHours()} : ${new Date().getMinutes()}` }]);
        }
    }

    const handleDeleteSchedule = (scheduleIndex: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Apply layout animation
        const updatedSchedule = schedule.filter((_, index) => index !== scheduleIndex);
        setSchedule(updatedSchedule);
        setIndex(index - 1);
    };

    return (
        <View style={{...styles.containerSchedule}}>
            { schedule.map( (element: Schedule, idx: number) => (
                <View key={idx}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>{`Schedule: ${idx + 1}`}</Text>
                        {    
                            index >= 1 &&
                            <TouchableOpacity
                                onPress={() => handleDeleteSchedule(idx)}
                                style={{padding: 5}}
                            >
                                <Icon name={'trash-alt'} size={20} color={'red'} light />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{flex: 1}}>
                        <View style={styles.containerDays}>
                            <View style={styles.containerPickerButton} >
                                <PickerDayButton
                                    title={element.day1 === '' ? 'Del dia': element.day1 }
                                    day='day1'
                                    action={updateScheduleItem}
                                    index={idx}
                                />
                            </View>
                            <View style={styles.containerPickerButton}>
                                <PickerDayButton
                                    title={element.day2 === '' ? 'Al dia': element.day1 }
                                    day='day2'
                                    action={updateScheduleItem}
                                    index={idx}
                                />
                            </View>
                        </View>
                        <View style={styles.containerHours}>
                            <View style={styles.containerHourOpen} >
                                <TouchableOpacity   
                                    onPress={() => setOpenHourOne(true)}
                                    style={styles.stylesTouchable}
                                >
                                    <Text style={{color: 'black', fontWeight: 'bold', marginRight: 5}} >De: </Text>
                                    <Text style={{color: 'black', fontWeight: 'bold'}} >{ element.open }</Text>    
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    title={'Hora de apertura (HH:MM)'}
                                    mode='time'
                                    open={openHourOne}
                                    date={hourOne}
                                    onConfirm={(date) => {
                                        setOpenHourOne(false)
                                        setHourOne(date)
                                        var hour = `${hourOne.getHours()} : ${hourOne.getMinutes()}` 
                                        updateScheduleItem(idx, {open: hour})
                                    }}
                                    onCancel={() => {
                                        setOpenHourOne(false)
                                    }}
                                    is24hourSource= 'locale'
                                    style={{ flex: 1 }}
                                />
                            </View>
                            <View style={styles.containerHourClose}>
                                <TouchableOpacity   
                                    onPress={() => setOpenHourTwo(true)}
                                    style={styles.stylesTouchable}
                                >
                                    <Text style={{color: 'black', fontWeight: 'bold', marginRight: 5}} >A: </Text>
                                    <Text style={{color: 'black', fontWeight: 'bold'}} >{element.close}</Text>    
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    title={'Hora de cierre (HH:MM)'}
                                    mode='time'
                                    open={openHourTwo}
                                    date={hourTwo}
                                    onConfirm={(date) => {
                                        setOpenHourTwo(false)
                                        setHourTwo(date)
                                        var hour = `${hourTwo.getHours()} : ${hourTwo.getMinutes()}` 
                                        updateScheduleItem(idx, {close: hour})
                                    }}
                                    onCancel={() => {
                                        setOpenHourTwo(false)
                                    }}
                                    is24hourSource='locale'
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            ))
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.touchablePlus}
                    onPress={handleAddSchedule}
                >
                    <Icon name={'plus'} size={20} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
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