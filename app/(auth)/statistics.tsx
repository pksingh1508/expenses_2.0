import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { LinearGradient } from "expo-linear-gradient";
import RecentTransaction from "@/components/Home/RecentTransaction";

const Statistics = () => {
  const barData = [
    { value: 250 },
    { value: 500, frontColor: "#177AD5" },
    { value: 745, frontColor: "#177AD5" },
    { value: 320 },
    { value: 600, frontColor: "#177AD5" },
    { value: 256 },
    { value: 300 }
  ];
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(38,38,38,255)", "rgba(19,18,19,255)"]}
        style={styles.background}
      />
      <View style={styles.barChart}>
        <BarChart
          barWidth={22}
          noOfSections={5}
          barBorderRadius={4}
          frontColor="red"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{ color: "white" }}
        />
      </View>
      <RecentTransaction />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  barChart: {
    paddingVertical: 10,
    paddingHorizontal: 15
  }
});
export default Statistics;
