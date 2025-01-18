import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useSessionStore } from "@/store/sessionStore";

const TopHeader = () => {
  const { name } = useSessionStore();
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.hello}>Hello,</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14
  },
  searchContainer: {
    backgroundColor: Colors.whiteFade,
    padding: 10,
    borderRadius: "40%"
  },
  hello: {
    fontFamily: "nm",
    color: Colors.white,
    fontSize: 15
  },
  userName: {
    fontFamily: "nm",
    color: "white",
    fontSize: 21
  }
});
export default TopHeader;
