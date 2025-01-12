import { InputModeOptions, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

interface textInputProps {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  inputMode: InputModeOptions;
  customStyle?: object;
}

const CustomInput = ({placeholder, value, onChange, inputMode, customStyle}: textInputProps) => {
  return (
    <TextInput 
      placeholder={placeholder}
      placeholderTextColor={Colors.whiteFade}
      cursorColor={Colors.whiteFade}
      inputMode={inputMode}
      keyboardAppearance='dark'
      style={[styles.input, customStyle]}
      value={value}
      onChangeText={onChange}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.whiteFade,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'nm',
    height: 50,
    width: '100%'
  }
});

export default CustomInput;
