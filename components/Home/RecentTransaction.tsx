import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useRefreshStore } from "@/store/refreshStore";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/sessionStore";
import SingleTransaction from "./SingleTransaction";

const RecentTransaction = () => {
  const [expenseData, setExpenseData] = useState<any>([]);
  const { refreshFlag } = useRefreshStore();
  const { user_id } = useSessionStore();

  async function getAllExpense() {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user_id)
        .limit(50)
        .order("created_at", { ascending: false });
      if (error) {
        Alert.alert("Error while getting expenses.");
        return;
      }
      if (data) {
        setExpenseData(data);
      }
    } catch (err) {
      Alert.alert("Error on getting Expenses.");
    }
  }

  //   console.log("data", expenseData);

  useEffect(() => {
    getAllExpense();
  }, [refreshFlag]);
  return (
    <View style={styles.container}>
      <Text style={styles.recentText}>Recent Transactions</Text>
      <FlatList
        data={expenseData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SingleTransaction {...item} />}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  recentText: {
    color: Colors.white,
    fontSize: 23,
    fontFamily: "park-m",
    paddingLeft: 15
  },
  flatList: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 4,
    paddingBottom: 10
  }
});
export default RecentTransaction;
