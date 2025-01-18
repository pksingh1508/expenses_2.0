import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const CustomBackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Feather name="arrow-left" size={24} color={Colors.whiteFade} />
    </TouchableOpacity>
  );
};
export default CustomBackButton;
