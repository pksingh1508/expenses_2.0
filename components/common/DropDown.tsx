import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

interface SingleProps {
  id?: number;
  label: string;
  value: string;
  key: number;
  color: string;
}

interface DropDownProps {
  data: SingleProps[];
  onChange: (value: string) => void;
  onChange2?: (key: number) => void;
  text: string;
}

const DropDown = ({ data, onChange, onChange2, text }: DropDownProps) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value, id) => {
          onChange(value);
          if (onChange2) onChange2(id);
        }}
        placeholder={{
          label: text,
          value: null,
          key: null,
          color: Colors.white
        }}
        items={data}
        Icon={() => (
          <View style={{ top: 25, right: 16 }}>
            <AntDesign name="caretdown" size={18} color={Colors.white} />
          </View>
        )}
        style={pickerSelectStyles}
        activeItemStyle={{
          backgroundColor: Colors.blackFade
        }}
        dropdownItemStyle={{
          backgroundColor: Colors.blackFade
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.whiteFade,
    borderRadius: 15
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightblack,
    borderRadius: 5,
    color: Colors.white
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightblack,
    borderRadius: 5,
    color: Colors.white
  }
});

export default DropDown;
