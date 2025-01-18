import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";

interface Props {
  amount: number;
  date: string;
  description: string;
  expense_category: string;
  type: string;
}

const SingleTransaction = ({
  amount,
  date,
  description,
  expense_category,
  type
}: Props) => {
  const sign = type === "expense" ? "-" : "+";
  return (
    <Animated.View
      entering={FadeInDown.duration(700).springify()}
      exiting={FadeInLeft.duration(700).springify()}
      style={styles.container}
    >
      <Animated.View
        entering={FadeInDown.duration(500).springify()}
        exiting={FadeInLeft.duration(500).springify()}
      >
        <Text style={styles.category}>{expense_category}</Text>
        <Text style={styles.desc}>{description.slice(0, 100)}</Text>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        exiting={FadeInLeft.duration(400).springify()}
        style={styles.right}
      >
        <Text
          style={[
            styles.amount,
            { color: type === "expense" ? "red" : "green" }
          ]}
        >
          {sign}
          {amount}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262727",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 7,
    elevation: 7
  },
  right: {
    alignItems: "flex-end"
  },
  category: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "nsb",
    textTransform: "capitalize"
  },
  desc: {
    color: Colors.whiteFade,
    fontSize: 17,
    fontFamily: "park-r"
  },
  amount: {
    fontSize: 20,
    fontFamily: "nsb"
  },
  date: {
    fontSize: 17,
    fontFamily: "park-r",
    color: Colors.whiteFade
  }
});
export default SingleTransaction;
