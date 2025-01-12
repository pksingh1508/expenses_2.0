import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';

interface DatePickerProps {
    setSelectedDate: (date: Date) => void;
}


const DatePicker = ({setSelectedDate}: DatePickerProps) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date; // Use the selected date or keep the current date
        setShow(false); // Hide the date picker
        setDate(currentDate); // Update the date state
        setSelectedDate(currentDate);
    };

    const toggleShow = () => {
        setShow(!show);
    }

  return (
    <SafeAreaView>
        <TouchableOpacity onPress={toggleShow}>
            <View style={styles.dateContainer}>
                <Text style={styles.text}>{date.toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
        {show && (
            <DateTimePicker
                testID='dateTimePicker' 
                mode='date'
                display='spinner'
                value={date}
                onChange={onChange}
                is24Hour={false}
                maximumDate={new Date()}
            />
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    dateContainer: {
        borderWidth: 1,
        borderColor: Colors.whiteFade,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10
    },
    text: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: 'park-r',
        padding: 2
    }
});
export default DatePicker
