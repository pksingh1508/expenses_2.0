import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { useWalletStore } from "@/store/walletStore";
import { useRefreshStore } from "@/store/refreshStore";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/sessionStore";

const IncomeCard = () => {
  const { totalAmount, totalExpense, totalIncome } = useWalletStore();
  const { refreshFlag } = useRefreshStore();
  const { user_id } = useSessionStore();
  const [tIncome, setTIncome] = useState(0);
  const [tExpense, setTExpense] = useState(0);
  const total = totalAmount + tIncome - tExpense;
  console.log(
    "data",
    totalAmount,
    totalExpense,
    totalIncome,
    tIncome,
    tExpense
  );

  const calculateTotal = (data: any) => {
    let inc = 0;
    let exp = 0;
    for (let i = 0; i < data.length; i++) {
      inc = inc + data[i].income;
      exp = exp + data[i].expense;
    }
    setTIncome(inc);
    setTExpense(exp);
  };

  async function getAllIncomeExpense() {
    try {
      const { data, error } = await supabase
        .from("allMoney")
        .select("*")
        .eq("user_id", user_id);
      if (error) {
        Alert.alert("Supabase Error while getting the data.");
        return;
      }
      if (data) {
        calculateTotal(data);
      }
    } catch (err) {
      Alert.alert("Error while getting all the income and expenses.");
    }
  }
  useEffect(() => {
    getAllIncomeExpense();
  }, [refreshFlag]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/card.png")}
        style={styles.card}
      />
      <View style={styles.balanceContainer}>
        <View style={styles.top}>
          <Text style={styles.totalText}>Total Balance</Text>
          <Entypo name="dots-three-horizontal" size={24} color="black" />
        </View>
        <View style={styles.middle}>
          <Text style={styles.total}>₹ {total}.00</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <View style={styles.incomeBox}>
              <Feather name="arrow-down-circle" size={22} color="black" />
              <Text style={styles.incomeBoxText}>Income</Text>
            </View>
            <Text style={styles.incomeText}>₹ {tIncome}.00</Text>
          </View>
          <View>
            <View style={styles.incomeBox}>
              <Feather name="arrow-up-circle" size={22} color="black" />
              <Text style={styles.incomeBoxText}>Expense</Text>
            </View>
            <Text style={styles.expenseText}>₹ {tExpense}.00</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center"
  },
  card: {
    width: "90%",
    height: 250,
    resizeMode: "contain"
  },
  balanceContainer: {
    position: "absolute",
    width: "90%",
    top: 30,
    gap: 15
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 19
  },
  middle: {
    paddingHorizontal: 20
  },
  totalText: {
    color: "black",
    fontSize: 18,
    fontFamily: "nm"
  },
  total: {
    fontSize: 30,
    fontFamily: "park-b"
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  incomeBox: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  incomeBoxText: {
    fontFamily: "nm",
    fontSize: 18
  },
  incomeText: {
    fontSize: 19,
    fontFamily: "park-b",
    color: "green"
  },
  expenseText: {
    fontSize: 19,
    fontFamily: "park-b",
    color: "red"
  }
});
export default IncomeCard;
