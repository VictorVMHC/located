import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { PickerDayButton } from '../Components/PickerDayButton';
import { Schedule } from '../Interfaces/DbInterfaces';
import DatePicker from 'react-native-date-picker';
import { Colors} from '../Themes/Styles';
import Icon  from 'react-native-vector-icons/FontAwesome5';


export const Step4View = () => {
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [hourOne, setHourOne] = useState(new Date())
    const [hourTwo, setHourTwo] = useState(new Date())
    const [openHourOne, setOpenHourOne] = useState(false)
    const [openHourTwo, setOpenHourTwo] = useState(false)
    
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
                <View style={styles.containerSchedule}>
                    <View style={{flex: 1}}>
                        <View style={styles.containerDays}>
                            <View style={styles.containerPickerButton} >
                                <PickerDayButton
                                    title={'Del dia'}
                                    day='day1'
                                    action={updateScheduleItem}
                                    index={0}
                                />
                            </View>
                            <View style={styles.containerPickerButton}>
                                <PickerDayButton
                                    title={'Al dia'}
                                    day='day2'
                                    action={updateScheduleItem}
                                    index={0}
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
                                    <Text style={{color: 'black', fontWeight: 'bold'}} >{ `${hourOne.getHours()}:${hourOne.getMinutes()}` }</Text>    
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
                                        var hour = `${hourOne.getHours()}:${hourOne.getMinutes()}` 
                                        updateScheduleItem(0, {open: hour})
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
                                    <Text style={{color: 'black', fontWeight: 'bold'}} >{`${hourTwo.getHours()}:${hourTwo.getMinutes()}`}</Text>    
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
                                        var hour = `${hourTwo.getHours()}:${hourTwo.getMinutes()}` 
                                        updateScheduleItem(0, {close: hour})
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.touchablePlus}
                        >
                            <Icon name={'plus'} size={20} color={'black'} />
                        </TouchableOpacity>
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