import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    customStyle?: ViewStyle;
}

const CustomButton = ({ title, onPress, customStyle }: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.Btn, customStyle]}>
        <Text style={styles.BtnText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    Btn: {
        width: '50%',
        paddingVertical: 13,
        backgroundColor: Colors.parrotgreen,
        borderRadius: 10
    },
    BtnText: {
        color: Colors.black,
        fontSize: 20,
        fontFamily: 'park-b',
        textAlign: 'center'
    }
})

export default CustomButton
